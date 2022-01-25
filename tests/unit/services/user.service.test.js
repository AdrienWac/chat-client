import { expect } from '@jest/globals';
import axios from 'axios';
import UserService from '../../../src/services/user.service';

jest.mock('axios');

describe(`User Service: create user`, () => {

    it('should return response data', async () => {
        
        const response = { code: 200, message: null, data: { username: 'JDoe' } };

        axios.post.mockImplementationOnce((url, data) => Promise.resolve(response));
        
        try {

            const user = await UserService.createUser({ username: 'JDoe' });
            
            expect(user).toEqual(response.data);

        } catch (error) {

            throw new Error(`Erreur lors du test de la création d'un utilisateur. ${error.message}`);

        }
        
    });

    it('should throw an exception due to the return code', () => {

        const response = { code: 400, message: 'Impossible de récupérer l\'utilisateur', data: null };
        
        axios.post.mockResolvedValueOnce(Promise.resolve(response));

        UserService.createUser({ username: 'JDoe' }).catch(error => expect(error).toMatch(`Erreur lors de la création de l'utilisateur.`))

    });


});

