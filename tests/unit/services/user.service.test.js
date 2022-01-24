import { expect } from '@jest/globals';
import axios from 'axios';
import UserService from '../../../src/services/user.service';

jest.mock('axios');

describe(`User Service: create user`, () => {

    it('should return response data', () => {
        
        const response = { code: 200, message: null, data: { username: 'JDoe' } };

        axios.post.mockImplementationOnce((url, data) => Promise.resolve(response))
        
        return UserService.createUser({username: 'JDoe'}).then(user => expect(user).toEqual({username: 'JDoe'}));

    });

    it('should throw an exception due to the return code', () => {

        const response = { code: 400, message: 'Impossible de récupérer l\'utilisateur', data: null };
        
        axios.post.mockResolvedValueOnce(Promise.resolve(response));

        UserService.createUser({ username: 'JDoe' }).catch(error => expect(error).toMatch(`Erreur lors de la création de l'utilisateur.`))

    });


});

