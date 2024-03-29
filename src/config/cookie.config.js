const cookieConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const options = {
    httpOnly: isProduction ? true : false,
    secure: isProduction ? true : false,
    sameSite: isProduction ? 'none' : 'lax',
    domain: '.pixvie.tech',
  };
  return options;
};

module.exports = cookieConfig;
