<template>
    <div class="container">
        <div class="container__register">
            <alert v-if="alert" @close="clearAlert" :type="alert.type" :message="alert.message"/>
            <form @submit.prevent="loginUser" class="register__form">
                <label class="form__label--username" for="username">Renseigner votre nom d'utilisateur</label>
                    <input class="form__input--username" v-model="form.username" name="username" type="text" placeholder="Username"/>
                    <button class="form__button--submit" :disabled="!isValidUsername" type="submit">Envoyer</button>
            </form>
        </div>
    </div>  
</template>

<script>

import Alert from '../components/Alert.vue';
function test() {
    throw new CustomError(201, 'Test du message');
}
export default {
    name: 'Login',
    components: {
        Alert
    },
    data: () => ({
        form: {
            username: ''
        },
        alert: {
            type: null,

            message: ''
        }
    }),
    mounted: () => {
        console.log('ici', localStorage.getItem('user'));
        // throw new CustomError(201, 'Test custom error');
        try {
            test();            
        } catch (error) {
            console.log('Error', error['message']);
        }
    },
    computed: {
        isValidUsername() {
            return this.form.username.trim().length > 2;
        }
    },
    methods: {
        async loginUser() {
            
            try {

                const user = await this.$store.dispatch('user/login', this.form);

                this.$router.push({name: 'Home'});

            } catch (error) {

                this.alert = {type: 'danger', message: `Echec de la connexion de l'utilisateur. ${error.message}.`};

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

    .container{
        background: map-get($colors, primary);
        font-family: $oswald;
        height: 100vh;
        display: grid;
        grid-template-columns: 2fr 8fr 2fr;
        grid-template-rows: 2fr 8fr 2fr;

        .container__register {
            // grid-row-start / grid-column-start / grid-row-end / grid-column-end:
            grid-area: 2 / 2 / 3 / 3;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        form {
            
            display: grid;
            grid-template-columns: 3fr 3fr 3fr 3fr;
            grid-template-rows: 6fr 1fr 6fr;

            label[for="username"] {
                grid-area: 1 / 1 / 2 / 5;
                font-size: 3rem;
                color: map-get($colors, second);
            }

            input[name="username"] {
                grid-area: 3 / 1 / 4 / 4; 
                border: 1px solid map-get($colors, second);
            }

            button[type="submit"] {
                grid-area: 3 / 4 / 4 / 5;
                background: map-get($colors, second);
                border: none;
                font-weight: bold;
                text-transform: uppercase;
                color: map-get($colors, white);
            }

            button[type="submit"]:hover {cursor: pointer;background: darken(map-get($colors, second), 5%);}
            button[type="submit"]:disabled {background: rgba(map-get($colors, second), 0.4);cursor: not-allowed;}
        }
    }

</style>