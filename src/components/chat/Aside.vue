<template>
    <aside>
        <div class="title">
            <h2 class="title__content">Utilisateurs</h2>
            <router-link :to="{ name: 'Logout'}">Logout</router-link>
        </div>
        <div class="list-users">
            <ul>
                <li v-for="user in arrayUsers" :key="user.userId" v-on="user.is_connected? {click: () => selectUser(user)} : {}" :class=" `${selectedUser === user ? 'selected' : ''} list-users__item`" :data-state="`${user.is_connected ? 'online' : 'offline'}`" > 
                    <div class="item__profil-pic">
                        <img alt="Vue logo" src="../../assets/logo.png">
                    </div>
                    <div class="item__username">
                        <span>{{user.username}}</span>
                        <TypingAnimation v-if="user.is_typing" :showText="false" />
                    </div>
                    <div v-if="user.hasNewMessages > 0" class="item__notification"><span class="badge">{{user.hasNewMessages > 10 ? '10+' : user.hasNewMessages}}</span></div>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import TypingAnimation from '../../components/chat/TypingAnimation.vue'
import {onMounted, ref, reactive, computed} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UserService from '../../services/user.service';

export default {
    name: 'Aside',
    setup(props, context) {

        const store = useStore();

        const router = useRouter();

        const arrayUsers = computed(() => store.getters['chat/arrayUsers']);

        const selectedUser = computed(() => store.getters['chat/selectedUser']);

        const selectUser = (user) => {
            store.dispatch('chat/selectUser', user);
        }

        const signout =  () => UserService.logout();

        return {
            selectUser, 
            signout,
            arrayUsers,
            selectedUser
        };
    },
    components: {
        TypingAnimation
    }
}
</script>

<style scoped lang="scss">

aside {
    display: grid;
    grid-template-rows: 8% 92%;
    border-right: 1px solid map-get($colors, primary);
    .title {
        padding: 10px 5px;
        border-bottom: 1px solid map-get($colors, primary);
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2{font-size: 2rem;text-transform: uppercase;color: map-get($colors, second);}
    }
}
.list-users {
    
    .list-users__item[data-state="offline"] .item__profil-pic img { border-color: map-get($colors, offline );}
    .list-users__item[data-state="online"] .item__profil-pic img { border-color: map-get($colors, online );}

    .list-users__item:hover, .list-users__item.selected {
        cursor: pointer;
        background: rgba(0 , 0, 0, 0.05);
    }

    .list-users__item {

        margin: 5px 0;
        padding: 10px;
        display: grid;
        grid-template-columns: 2fr 9fr 1fr;

        .item__profil-pic img {
            border: 2px solid;
            border-radius: 50%;
            padding: 5px;
            width:32px;
            height:32px;
        }

        .item__username {
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: normal;
            font-size: 1.2rem;
            padding: 0 5px;
        }

        .item__notification {
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            .badge {
                display: block;
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background: map-get($colors, notification);
                text-align: center;
                line-height: 22px;
                font-weight: bold;
                color: #fff;
                font-size: 0.7rem;
            }

        }

    }

}
</style>