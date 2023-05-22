const User = require('../models/user.model')

module.exports = (io, socket) => {
    const getMessage = async (payload) => {
        const { message } = payload;
        const {id: userID, username} = payload.user
        
        if(userID){
            try {
                const { role } = await User.findById(userID);
                if(role === "ADMIN" && message.startsWith("/")){
                    const [command, ...params] = message.split(" ");
                    console.log(command, "was runned by", username);
                    switch(command){
                        case "/clear":
                            io.emit("CLEAR_CHAT");
                            break;
                        case "/kick":
                            io.emit("FORCE_DISCONNECT", params[0]);
                            break;
                        case "/warn":
                            io.emit("WARN", {
                                username: params[0],
                                message: params[1]
                            });
                            break;
                        default:
                            break;
                    }
                    return;
                }
                const newMessage = `[GM]${username}: ${message}`
                io.emit("SEND_MESSAGE", newMessage);
                return;   
            } catch (error) {
                console.log(error);
            }
        }
        const newMessage = `${username}: ${message}`
        io.emit("SEND_MESSAGE", newMessage);
    }

    const handleModeration = async (payload) => {
        const {status, message} = payload;
        switch(status){
            case "SELF_DISCONNECT":
                socket.emit("SEND_MESSAGE", "SERVER: You kicked from the session.");
                socket.disconnect(true);
                break;
            case "CHAT_WARN":
                socket.emit("SEND_MESSAGE", `SERVER: ${message}`);
                break;
            default:
                break;
        }
            
    }
    
    socket.on("HANDLE_MODERATION", handleModeration);
    socket.on("CHAT_MESSAGE", getMessage);
  }