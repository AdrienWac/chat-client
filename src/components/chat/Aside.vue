<template>
    <aside>
        <ul>
            <li v-for="user in users" @click="selectUser(user)"> {{user.username}}</li>
        </ul>
    </aside>
</template>

<script>
import {onMounted, ref, reactive, watch} from 'vue'
import Socket from '../../socket'

export default {
    name: 'Aside',
    props: {
        room: {
            default() {
                return '/';
            }
        },
    },
    methods: {
        selectUser(user) {
            console.log('select user', user);
            this.$emit('selectionUser', user);
        }
    },
    setup(props) {
        
        let users = ref([]);

        const generateListUsers = (arrayUsers) => {

            arrayUsers.forEach(userData => {
                userData.self = userData.userId === Socket.id;
            });

            return arrayUsers.sort((a, b) => {
                // a sera placé avant b
                if (a.self) return -1;
                // b sera placé avant a
                if (b.self) return 1;
                // Si b est supérieur a a, b sera placé avant a
                if (a.username < b.username) return 1;
                // Si a est supérieur a b, a sera placé avant b
                if (a.username > b.username) return -1;
                // Sinon a & b sont égaux on retourne 0
                return 0;
            });
        }


        onMounted(() => {
            Socket.on('users', (usersOnSocket) => {
                users.value = generateListUsers(usersOnSocket);
            });
        });

        Socket.on('user connected', (userInformation) => {
            users.value.push(userInformation);
        });

        return {users};
  },
}
</script>

<style scoped lang="scss"></style>