/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import Alert from '../../../src/components/Alert.vue'

describe(`Alert component`, () => {

    it(`Should display an error message`, async () => {

        const wrapper = shallowMount(Alert, {
            props: {
                type: null,
                message: ''
            }
        });

        // Tester que le rendu html ne contient pas le bloc avec classe alert
        expect(wrapper.get('.alert').isVisible()).toBe(false);

        // Mise à jour des props type et message
        await wrapper.setProps({ type: 'danger', message: 'Ceci est un message d\'erreur'});

        // Tester que le rendu html du component contient bien le message
        expect(wrapper.get('.alert').isVisible()).toBe(true);

        // Tester que le bloc alert a bien la classe en lien avec le type d'error
        expect(wrapper.find('.alert-danger').exists()).toBe(true);

    });

    it(`Should close alert`, async() => {
        
        // ShallowMount avec props type et message
        const wrapper = shallowMount(Alert, {
            props: {
                type: 'danger',
                message: 'Test message alert'
            }
        });

        // Test que le rendu html contient bien la balise .alert et que la computed visible est à true
        expect(wrapper.find('.alert-danger').exists()).toBe(true);

        // Find button close et trigger click
        await wrapper.find('button').trigger('click');

        // Test que l'événement close
        expect(wrapper.emitted()).toHaveProperty('close');

    });

});