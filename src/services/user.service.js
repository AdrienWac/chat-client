import axios from 'axios';

class UserService {


    async createUser(user) {

        try {
            
            const response = await axios.post(`${process.env.VUE_APP_URL_API}/user`, user);

            const regexHtppSuccessStatus = new RegExp(/^20[0-8]$/g);

            if (!regexHtppSuccessStatus.test(response.status)) {
                throw new Error(response.message);
            }

            return response.data.result;

        } catch (error) {

            throw new Error(error.message);

        }
        
    }

}



export default new UserService();