<template>
    <div class="home">
        <alert v-if="alert" @close="clearAlert" :type="alert.type" :message="alert.message"/>
        <form @submit="createUsername">
            <div class="form-group">
                <input v-model="form.username" type="text" placeholder="Renseigner un nom d'utilisateur"/>
            </div>
            <button :disabled="!isValidUsername" type="submit">Envoyer</button>
        </form>
    </div>  
</template>

<script>

import Alert from '@/components/Alert.vue';

export default {
    name: 'Register',
    components: {
        Alert
    },
    data: () => ({
        form: {
            username: ''
        },
        alert: null
    }),
    computed: {
        isValidUsername() {
            return this.form.username.trim().length > 2;
        }
    },
    methods: {
        async createUsername() {
            
            try {

                const user = await this.$store.dispatch('user/create', this.form);

            } catch (error) {

                console.log('error', error.message);

                this.alert = {
                    type: 'error',
                    message: `Erreur lors de l'enregistrement de l'utilisateur. ${error}.`
                };

            }

        },
        clearAlert() {
            this.alert.type = null;
            this.alert.message = '';
        }
        
    }
}
</script>