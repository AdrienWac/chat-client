/**
 * @jest-environment jsdom
 */
import UserService from "../../../src/services/user.service";
import { userStoreModule } from "../../../src/store/user.module";

jest.mock('../../../src/services/user.service');


describe('Test user module from Store', () => {

    describe('Test to create user', () => {

        beforeEach(() => {
            localStorage.clear();
        });

        it('Should add user information in store and in local storage', async () => {

            const response = {username: "JDoe"};
            const request = { username: 'JDoe' };

            // Mock UserService
            UserService.createUser.mockImplementationOnce((request) => Promise.resolve(response));

            // Call userStoreModule.actions.create
            const context = { commit: jest.fn() };
            
            await userStoreModule.actions.create(context, request);

            // Expect local storage contain user information
            expect(JSON.parse(localStorage.getItem('user'))).toEqual(response);
            
            // Tester l'appel de COMMIT ? 
            expect(context.commit).toHaveBeenCalledWith('SET_USER', response);

        });

        // Test si la méthode de UserService retourne une erreur
        it('Should have an empty localStorage because of an error', async () => {

            const request = { username: 'JDoe' };
            
            // Mock UserService
            UserService.createUser.mockImplementationOnce((request) => {throw new Error(`Impossiblqsqsqe de créer l'utilisateur`)});

            const context = { commit: jest.fn() };
            try {
                await userStoreModule.actions.create(context, request);
            } catch (error) {
                expect(error.message).toMatch(`Impossiblqsqsqe de créer l'utilisateur`);
            } finally {
                expect(localStorage.getItem('user')).toBeNull();
            }

        });

    });

});
