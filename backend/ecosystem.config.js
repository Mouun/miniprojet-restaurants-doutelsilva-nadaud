module.exports = {
    apps : [{
        name: 'backoffice',
        script: './server.js',
        instances: 1,
        autorestart: true,
        max_memory_restart: '1G',
    }],
};
