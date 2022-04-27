<template>
    <aside :class="asideIsOpen ? `aside--open` : `aside--close`">
        <div class="aside__icons" @click="setAsideState()" >
            <Hamburger v-if="!asideIsOpen" :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="40" width="40" />
            <XmarkSvg v-if="asideIsOpen" :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="40" width="40"/>
        </div>
        
        <ul class="aside__users">
            <li 
                v-for="user in arrayUsers" 
                :key="user.userId" 
                v-on="user.is_connected? {click: () => selectUser(user)} : {}" 
                :class=" `${selectedUser === user ? 'selected' : ''} aside-users__item`" 
                :data-state="`${user.is_connected ? 'online' : 'offline'}`" 
            > 
                <div class="item__profil-pic" v-tooltip.right="{ content: user.username, disabled: asideIsOpen, theme: 'tooltip'}">
                    <img alt="Vue logo" src="../../assets/logo.png">
                </div>
                <div class="item__informations">
                    <span class="item__username">{{user.username}}</span>
                    <span v-if="!user.is_typing" class="item__last-message">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure qui iusto accusantium necessitatibus 
                        molestiae omnis. Omnis et sed voluptates, culpa vero nobis ad nostrum pariatur. Aspernatur sint exercitationem voluptas doloremque.
                    </span>
                    <TypingAnimation v-if="user.is_typing" :showText="false" />
                </div>
                <div v-if="user.hasNewMessages > 0" class="item__notification"><span class="badge">{{user.hasNewMessages > 10 ? '10+' : user.hasNewMessages}}</span></div>
            </li>
        </ul>
        <div class="aside__logo-app">
            Le chaat'
        </div>
    </aside>
</template>

<script>
import TypingAnimation from '../../components/chat/TypingAnimation.vue'
import Hamburger from '../../components/svg/Hamburger.vue'
import XmarkSvg from '../../components/svg/Xmark.vue'
import PowerOff from '../../components/svg/PowerOff.vue'
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

        let asideIsOpen = ref(true);
        const setAsideState = () => {
            asideIsOpen.value  = !asideIsOpen.value;
        }

        return {
            selectUser, 
            signout,
            arrayUsers,
            selectedUser,
            setAsideState,
            asideIsOpen
        };
    },
    components: {
        TypingAnimation,
        Hamburger,
        XmarkSvg,
        PowerOff
    }
}
</script>

<style scoped lang="scss">
    @import url('../../assets/scss/mobile/aside.scss') screen and (max-width: 64em);
    @import '../../assets/scss/desktop/aside.scss';
    
    aside {

        display: grid;
        border-right: 1px solid map-get($colors, primary);

        .aside__icons {
            background-color: map-get($colors, second);
            color: map-get($colors, primary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .aside__users {

            overflow-y: scroll;
    
            .aside-users__item[data-state="offline"] .item__profil-pic img {
                border-color: map-get($colors, offline);
            }
    
            .aside-users__item[data-state="online"] .item__profil-pic img {
                border-color: map-get($colors, online);
            }
            
            .aside-users__item:hover,
            .aside-users__item.selected {
                cursor: pointer;
                background: rgba(0, 0, 0, 0.05);
            }

            .aside-users__item {
    
                padding: 10px;

                .item__username {
                    font-weight: normal;
                    font-size: 1.2rem;
                    padding: 0 5px;
                }
    
                .item__profil-pic img {
    
                    border: 2px solid;
                    border-radius: 50%;
                    padding: 5px;
    
                }

                .item__notification {
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
    }

    .aside--open {
    
        grid-template-rows: 1fr 9fr 2fr;
        width: 300px;
    
        .aside__users {
    
            .aside-users__item {
    
                display: grid;
                grid-template-columns: 2fr 9fr 1fr;
    
                .item__profil-pic img {
                    width: 32px;
                    height: 32px;
                }
    
                .item__informations {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
    
                .item__last-message {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    width: 190px;
                    display: block;
                    white-space: nowrap;
                    padding: 0 5px;
                }
    
                .item__notification {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
    
                }
    
            }
    
        }
    
        .aside__logo-app {
            background-color: map-get($colors, second);
            color: map-get($colors, primary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    
    }
    
    .aside--close {
    
        grid-template-rows: 1fr 11fr;
        width: 100px;
    
        .aside__users {
    
            text-align: center;
    
            .aside-users__item {
    
                position: relative;
    
                .item__profil-pic img {
                    width: 40px;
                    height: 40px;
                }
    
                .item__username {
                    display: none;
                }
    
                .item__last-message {
                    display: none;
                }
    
                .item__notification {
    
                    position: absolute;
                    bottom: 0px;
                    right: 15%;
    
                }
    
            }
    
        }
    
        .aside__logo-app {
            display: none;
        }
    
    }

</style>