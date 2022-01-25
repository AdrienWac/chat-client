/**
 * @jest-environment jsdom
 */
import UserService from "../../../../src/services/user.service";
import { userStoreModule } from "../../../../src/store/user.module";
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

jest.mock('../../../../src/services/user.service');


describe('Test create user into user module store', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    describe('Test Actions', () => {

        it('Should add user information in local storage', async () => {

            const response = {username: "JDoe"};
            const request = { username: 'JDoe' };

            UserService.createUser.mockImplementationOnce((request) => Promise.resolve(response));

            const context = { commit: jest.fn() };
            
            await userStoreModule.actions.create(context, request);

            expect(JSON.parse(localStorage.getItem('user'))).not.toBeNull();
            
            expect(context.commit).toHaveBeenCalledWith('SET_USER', response);

        });

        it('Should have an empty localStorage because of an error in user service', async () => {

            const request = { username: 'JDoe' };
            
            // Mock UserService
            UserService.createUser.mockImplementationOnce((request) => {throw new Error(`Impossible de créer l'utilisateur`)});

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

    describe('Test Mutations', () => {

        it(`Should add user information in state`, async () => {
            
            const user = {username: 'JDoe'};
            
            const store = new Vuex.Store({ modules: { userStoreModule: cloneDeep(userStoreModule)}});
            
            expect(store.state.userStoreModule.user).toBeNull();
            
            store.commit('userStoreModule/SET_USER', user);
            
            expect(store.state.userStoreModule.user).not.toBeNull();

        });

    });

});
