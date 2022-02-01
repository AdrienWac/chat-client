/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Register from '../../../src/views/Register.vue'
import Alert from '../../../src/components/Alert.vue'
import { userStoreModule } from "../../../src/store/user.module";
import { cloneDeep } from 'lodash'

describe('Register user', () => {

    it(`Should call store actions`, async () => {
        
        const mockUserStoreModule = cloneDeep(userStoreModule);

        mockUserStoreModule.actions.create = jest.fn();

        const $store = new Vuex.Store({
            modules: { user: mockUserStoreModule }
        });

        const wrapper = shallowMount(Register, {
            data() {
                return {
                    form: {
                        username: ''
                    },
                    alert: null
                }
            },
            global: {
                mocks: {
                    $store
                }
            }
        });

        const usernameValue = 'Jdoe';


        await wrapper.find('input[type="text"]').setValue(usernameValue);
        await wrapper.find('form').trigger('submit.prevent');
        expect(mockUserStoreModule.actions.create).toHaveBeenCalled();
        
    });

    it(`Should set computed isValidUsername value`, async () => {

        const wrapper = shallowMount(Register, {
            data() {
                return {
                    form: {
                        username: ''
                    },
                    alert: null
                }
            }
        });

        expect(wrapper.vm.isValidUsername).toBe(false);
        await wrapper.find('input[type="text"]').setValue('Jdoe');
        expect(wrapper.vm.isValidUsername).toBe(true);

    });

    it(`Should set alert data`, async () => {

        const context = { commit: jest.fn() };

        const request = {username: 'Jdoe'};

        const mockUserStoreModule = cloneDeep(userStoreModule);

        mockUserStoreModule.actions.create = jest.fn((context, request) => { throw new Error(`Impossible de créer l'utilisateur`) });

        const $store = new Vuex.Store({
            modules: { user: mockUserStoreModule }
        });

        const wrapper = shallowMount(Register, {
            data() {
                return {
                    form: {
                        username: ''
                    },
                    alert: null
                }
            },
            global: {
                mocks: {
                    $store
                }
            }
        });

        const usernameValue = 'Jdoe';

        expect(wrapper.vm.alert).toBeNull();
        await wrapper.find('input[type="text"]').setValue(usernameValue);
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.vm.alert.message).toMatch(`Impossible de créer l'utilisateur`);
       
        
    });

    // TODO Ceci est un test d'intégration pas unitaire.
    // it(`Should display alert message`, async () => {

    //     const context = { commit: jest.fn() };

    //     const request = { username: 'Jdoe' };

    //     const mockUserStoreModule = cloneDeep(userStoreModule);

    //     mockUserStoreModule.actions.create = jest.fn((context, request) => { throw new Error(`Impossible de créer l'utilisateur`) });

    //     const $store = new Vuex.Store({
    //         modules: { user: mockUserStoreModule }
    //     });

    //     const wrapper = shallowMount(Register, {
    //         data() {
    //             return {
    //                 form: {
    //                     username: ''
    //                 },
    //                 alert: null
    //             }
    //         },
    //         global: {
    //             mocks: {
    //                 $store
    //             }
    //         }
    //     });

    //     const usernameValue = 'Jdoe';

    //     expect(wrapper.find('.alert').exists()).toBe(false);
    //     await wrapper.find('input[type="text"]').setValue(usernameValue);
    //     await wrapper.find('form').trigger('submit.prevent');
    //     expect(wrapper.find('.alert').exists()).toBe(true);

    // });

    // TODO tester le contenu de l'alert dans le test du composant alert

});