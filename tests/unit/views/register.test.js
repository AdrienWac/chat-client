/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Register from '../../../src/views/Register.vue'
import { userStoreModule } from "../../../src/store/user.module";
import { cloneDeep } from 'lodash'

describe('Register user', () => {
    let actions;
    let mockUserStoreModule;
    let store;

    it(`Should call store actions`, async () => {
        
        const mockUserStoreModule = cloneDeep(userStoreModule);

        mockUserStoreModule.actions.create = ({ commit }, request) => {
            console.log('ouioui');
        };

        const store = new Vuex.Store({
            modules: { user: mockUserStoreModule} 
        });

        const spy = jest.spyOn(mockUserStoreModule.actions, 'create');

        const wrapper = shallowMount(Register, {
            data() {
                return {
                    form: {
                        username: 'JDoe'
                    },
                    alert: null
                }
            },
            store
        });

        const form = wrapper.find('form');

        form.trigger('submit');
        wrapper.vm.$nextTick(() => {
            expect(spy).toHaveBeenCalled();
            done()
        })
        
        // Tester que l'action du store est bien appelée
        
        
    });

    // it(`Should disabled submit button`, () => {

    // });

    // it(`Should display error alert`, () => {

    // });

});