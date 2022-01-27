import axios from 'axios';

class UserService {

    async createUser(user) {

        try {
            
            const response = await axios.post(`http://localhost:3000/user`, user);

            if (response.status !== 201) {
                throw new Error(response.message);
            }

            return response.data.result;

        } catch (error) {

            throw new Error(error.message);

        }
        
    }

}

export default new UserService();