import axios from 'axios';
import config from '../config';
import router from '../router';
import store from '../store';

class UserService {


    async createUser(user) {

        return {
            "id": 1,
            "sessionId": "695f1db9d802fce9",
            "username": "player1",
            "is_connected": true,
            "is_typing": false,
            "created": "2022-03-28T20:26:34.000Z",
            "updated": "2022-03-28T20:26:34.000Z"
        };

        try {
            
            const response = await axios.post(`${config.API_URL}/user`, user);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
                throw new CustomError(response.status, response.message);
            }

            return response.data.result;

        } catch (error) {

            throw new CustomError(400, error.message);

        }
        
    }

    logout() {
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (user !== null) {

            axios.post(`${config.API_URL}/user/signout`, user)
                .then(response => {

                    const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

                    if (!regexHtppSuccessStatus.test(response.status)) {
                        throw new CustomError(response.status, response.message);
                    }

                }).catch(error => {
                    throw new CustomError(400, error.message);
                });

            store.dispatch('user/logout');
        }
        
        router.push({name: 'Register'});

    }

}



export default new UserService();