import axios from 'axios';

class UserService {

    async createUser(user) {

        try {

            const result = await axios.post(`${process.env.API_URL}/user`, user);
            
            if (response.code !== 200) {
                throw new Error(`Erreur lors de la création de l'utilisateur. ${response.message}`);
            }

            return response.data;

        } catch (error) {

            throw new Error(`Erreur lors de la création de l'utilisateur. ${error}`);

        }
        
    }

}

export default new UserService();