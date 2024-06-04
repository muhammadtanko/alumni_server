const { APP_PORT, MONGO_URI, JWT_KEY } = process.env;
module.exports = {
    appPort: APP_PORT,
    mongoURI: MONGO_URI,
    // jwtKey: JWT_KEY,
    webToken: {
        secretKey: JWT_KEY,
        expiresIn: "2h"
    }
}


