<template>
    <aside>
        <div class="title">
            <h2 class="title__content">Utilisateurs</h2>
        </div>
        <div class="list-users">
        <ul>
            <li v-for="user in users" @click="selectUser(user)" class="list-users__item" data-state="online"> 
                <div class="item__profil-pic">
                    <img alt="Vue logo" src="../../assets/logo.png">
                </div>
                <div class="item__username">
                    {{user.username}}
                </div>
                <div class="item__notification"><span class="badge">10+</span></div>
            </li>
            <li class="list-users__item selected" data-state="online"> 
                <div class="item__profil-pic">
                    <img alt="Vue logo" src="../../assets/logo.png">
                </div>
                <div class="item__username">
                    Jdoe
                </div>
                <div class="item__notification"><span class="badge">10+</span></div>
            </li>
        </ul>
        </div>
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

<style scoped lang="scss">

aside {
    display: grid;
    grid-template-rows: 8% 92%;
    .title {
        padding: 10px 5px;
        border-bottom: 1px solid #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2{font-weight: bold;font-size: 1.4rem;}
    }
}
.list-users {
    
    padding: 5px;
    
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