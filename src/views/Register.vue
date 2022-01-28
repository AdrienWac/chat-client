<template>
    <div class="home">
        <alert v-if="alert" @close="clearAlert" :type="alert.type" :message="alert.message"/>
        <form @submit.prevent="createUsername">
            <div class="form-group">
                <label for="username">Renseigner votre nom d'utilisateur</label>
                <input v-model="form.username" name="username" type="text" placeholder="Jdoe"/>
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
        alert: {
            type: 'danger',
            message: '<p>sqdsklksqjkqjsqkjskqjkqjskqsjkqjsqk</p><ul><li>Test message d\'erreur</li><li>Test message d\'erreur</li></ul>'
        }
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
                this.$router.push({name: 'Home'});

            } catch (error) {

                this.alert = {type: 'danger', message: `Erreur lors de l'enregistrement de l'utilisateur. ${error.message}.`};

            }

        },
        clearAlert() {
            this.alert.type = null;
            this.alert.message = '';
        }
        
    }
}
</script>

<style scoped lang="scss">
    .home{
        background: $blue;
        font-family: $oswald;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    label{display:block;font-size: 12px;}
</style>