import axios from 'axios';

class UserService {

    async createUser(user) {

        try {

            const response = await axios.post(`${process.env.API_URL}/user`, user);
            
            if (response.code !== 200) {
                throw new Error(response.message);
            }

            return response.data;

        } catch (error) {

            throw new Error(error.message);

        }
        
    }

}

export default new UserService();