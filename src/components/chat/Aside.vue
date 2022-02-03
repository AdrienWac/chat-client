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
        users: Array
    },
    setup(props, context) {

        const selectUser = (user) => {
            context.emit('selectionUser', user);
        }

        return {selectUser};
    }
}
</script>

<style scoped lang="scss"></style>