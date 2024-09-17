const config = {
    mongoURI: 'mongodb://localhost:27017/forum',
    sessionSecret: 'yourSecretKey',
    roles: {
        admin: 'admin',
        moderator: 'moderator',
        user: 'user'
    }
};

module.exports = config;
