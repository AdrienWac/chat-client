import axios from 'axios';
import config from '../config';

class UserService {


    async createUser(user) {

        try {
            
            const response = await axios.post(`${config.API_URL}/user`, user);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
                throw new Error(response.message);
            }

            return response.data.result;

        } catch (error) {

            throw new Error(error.message);

        }
        
    }

    async login(user) {

        try {

            const response = await axios.post(`${config.API_URL}/user/signin`, user);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
                throw new Error(response.message);
            }

            return response.data.result;

        } catch (error) {

            throw new Error(error.message);
            
        }

    }

    async logout(user) {

        try {

            const response = await axios.post(`${config.API_URL}/user/signout`, user);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
                throw new Error(response.message);
            }

            return true;

        } catch (error) {

            throw new Error(error.message);

        }

    }

    async find(userId) {

        try {
            
            const response = await axios.get(`${config.API_URL}/user/${userId}`);
            console.log('response', response);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
                throw new Error(response.message);
            }

            return response.data.result;

        } catch (error) {   
            console.log('iciciciicicic', error.message);

            throw new Error(error.message);

        }

    }

    async isActive(userId) {
        
        const user = await this.find(userId);

        if (!Object.keys(user).includes('id')) {
            return false;
        }

        return user.is_active;
        
    }

}



export default new UserService();