import axios from 'axios';

class UserService {

    async createUser(user) {

        return axios.post(`${process.env.API_URL}/user`, user)
            .then(response => {
                // Si le code reponse n'est pas 20* => On lève une erreur
                if (response.code !== 200) {
                    throw new Error(`Erreur lors de la création de l'utilisateur. ${response.message}`);
                }
                // Sinon on retourne le résultat
                return response.data;
            })
            .catch(error => {
                // Si error pendant l'envoi de la requête => On lève une erreur
                throw new Error(`Erreur lors de la création de l'utilisateur. ${error}`);
            });

    }

}

export default new UserService();