<template>
    <div class="home">
        <form @submit.prevent="createUsername">
            <div class="form-group">
                <input v-model="form.username" type="text" placeholder="Renseigner un nom d'utilisateur"/>
            </div>
            <button :disabled="!isValidUsername" type="submit">Envoyer</button>
        </form>
    </div>  
</template>

<script>
export default {
    name: 'Register',
    data: () => ({
        form: {
            username: null
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
                console.log('iciicicicicici Register.createUserName', user);
                
            } catch (error) {

                this.alert = {
                    type: error,
                    message: `Erreur lors de l'enregistrement de l'utilisateur. ${error}.`
                };

            }

        }
    }
}
</script>