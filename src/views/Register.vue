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
        }
    }),
    computed: {
        isValidUsername() {
            return this.form.username.length > 2;
        }
    },
    methods: {
        createUsername() {
            console.log('createUsername', this.form);
        }
    }
}
</script>