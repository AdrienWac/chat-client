const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        API_URL: process.env.VUE_APP_URL_API
    },
    production: {
        API_URL: 'https://HEROKUAPP.heroku.com'
    },
    test: {
        API_URL: process.env.VUE_APP_URL_API
    }
};

export default config[env];