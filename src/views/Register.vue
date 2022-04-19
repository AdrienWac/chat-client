<template>
    <div class="container">
        <div class="container__register">
            <form @submit.prevent="createUsername" class="register__form">
                <label class="form__label--username" for="username">Renseigner votre nom d'utilisateur</label>
                    <input class="form__input--username" v-model="form.username" name="username" type="text" placeholder="Username"/>
                    <button class="form__button--submit" :disabled="!isValidUsername" type="submit">Envoyer</button>
            </form>
        </div>
    </div>  
</template>

<script>

export default {
    name: 'Register',
    components: {},
    data: () => ({
        form: {
            username: ''
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

                throw new CustomError(400, error.message);
                
            }

        },
        
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

            @media only screen and (max-width: 64em) {grid-template-rows: 4fr 4fr 4fr; }
            @media only screen and (min-width: 64.063em) { grid-template-rows: 6fr 1fr 6fr; } 
            

            label[for="username"] {
                grid-area: 1 / 1 / 2 / 5;
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

            @media only screen and (max-width: 64em) { 

                label[for="username"] { font-size: 1.3rem;display: flex; align-items: center; }

                input[name="username"] { grid-area: 2 / 1 / 3 / 5; font: size 1.5rem; padding: 10px 5px; }

                button[type="submit"] { grid-area: 3 / 1 / 4 / 5; }  
                
            }


            @media only screen and (min-width: 64.063em) { 

                label[for="username"] { font-size: 3rem; }

                input[name="username"] { grid-area: 3 / 1 / 4 / 4; }

                button[type="submit"] { grid-area: 3 / 4 / 4 / 5; }  
                
            }

            

            button[type="submit"]:hover {cursor: pointer;background: darken(map-get($colors, second), 5%);}
            button[type="submit"]:disabled {background: rgba(map-get($colors, second), 0.4);cursor: not-allowed;}
        }
    }

</style>