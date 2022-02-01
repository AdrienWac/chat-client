/**
 * @jest-environment jsdom
 */
sessionStorage.setItem('user', JSON.stringify({ username: 'JDoe' }));
import UserService from "../../../../src/services/user.service";
import { userStoreModule } from "../../../../src/store/user.module";
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

jest.mock('../../../../src/services/user.service');


describe('Test create user into user module store', () => {

    beforeEach(() => {
        sessionStorage.clear();
    });

    describe('Test Actions', () => {

        it('Should add user information in local storage', async () => {

            const response = {username: "JDoe"};
            const request = { username: 'JDoe' };

            UserService.createUser.mockImplementationOnce((request) => Promise.resolve(response));

            const context = { commit: jest.fn() };
            
            await userStoreModule.actions.create(context, request);

            expect(JSON.parse(sessionStorage.getItem('user'))).not.toBeNull();
            
            expect(context.commit).toHaveBeenCalledWith('SET_USER', response);

        });

        it('Should have an empty sessionStorage because of an error in user service', async () => {

            const request = { username: 'JDoe' };
            
            // Mock UserService
            UserService.createUser.mockImplementationOnce((request) => {throw new Error(`Impossible de créer l'utilisateur`)});

            const context = { commit: jest.fn() };
            try {
                await userStoreModule.actions.create(context, request);
            } catch (error) {
                expect(error.message).toMatch(`Impossible de créer l'utilisateur`);
            } finally {
                expect(sessionStorage.getItem('user')).toBeNull();
            }

        });

    });

    describe('Test Mutations', () => {

        it(`Should add user information in state`, async () => {
            
            const user = {username: 'JDoe'};
            
            const store = new Vuex.Store({ modules: { user: cloneDeep(userStoreModule)}});

            const test = store.getters['user/user'];

            expect('username' in store.getters['user/user']).toBe(false);

            store.commit('user/SET_USER', user);
            
            expect('username' in store.getters['user/user']).toBe(true);
            
        });

    });

});
