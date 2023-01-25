const passportjwt = require('passport-jwt');
const JwtStrategy = passportjwt.Strategy;
const User = require('../../models/user.model');

var cookieExtractor = function(req) {
  if (req && req.cookies){
    return req.cookies['jwtToken'];
  } 
};

var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

const jwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
})

module.exports = jwtStrategy;
