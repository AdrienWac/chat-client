const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        API_URL: process.env.VUE_APP_URL_API,
        APP_URL: process.env.VUE_APP_URL
    },
    production: {
        API_URL: 'https://a1234545648452121542122145.herokuapp.com',
        APP_URL : 'https://gtqw6qb1kj.herokuapp.com/'
    },
    test: {
        API_URL: process.env.VUE_APP_URL_API
    }
};

export default config[env];