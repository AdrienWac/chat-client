import axios from 'axios';
import config from '../config';
import router from '../router';
import store from '../store';
import socket from '../socket';
class UserService {


    async createUser(user) {

        // return {
        //     "id": 1,
        //     "sessionId": "695f1db9d802fce9",
        //     "username": "player1",
        //     "is_connected": true,
        //     "is_typing": false,
        //     "created": "2022-03-28T20:26:34.000Z",
        //     "updated": "2022-03-28T20:26:34.000Z"
        // };

        try {
            
            const response = await axios.post(`${config.API_URL}/user`, user);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
               
                throw new Error(response.data.message);
            }

            return response.data.result;

        } catch (error) {
            
            throw new Error(error.message);

        }
        
    }

    async logout() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {

            try {

                const response = await axios.post(`${config.API_URL}/user/signout`, { ...user, socketId: socket.id });

                const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

                if (!regexHtppSuccessStatus.test(response.status)) {
                    throw new CustomError(response.status, response.message);
                }

                store.dispatch('user/logout');

                router.push({ name: 'Register' });

            } catch (error) {

                if (error.response?.data?.message) {
                    throw new CustomError(400, error.response.data.message);
                } else {
                    throw new CustomError(400, error.message);
                }

            }


        }


    }

}

export default new UserService();