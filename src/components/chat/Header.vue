<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import PowerOff from '../svg/PowerOff.vue'

const store = useStore();

const selectedUser = computed(() => store.getters['chat/selectedUser']);

</script>

<template>
    <header>
        <div class="header__content">
            <div class="header__player-selected" >
            <span v-if="selectedUser.id" :data-state="`${selectedUser.is_connected ? 'online' : 'offline'}`" class="user"> {{selectedUser.username}} </span>
            <span v-if="selectedUser.is_typing" class="header__player--is-typing"> est en train d'écrire</span>
            </div>
        </div>
        <div class="header__logout">
            <router-link :to="{ name: 'Logout'}">
                <PowerOff :stroke="{color: 'transparent', width:3}" :fill="'#04902f'" height="30" width="30" />
            </router-link>
        </div>
    </header>
</template>

<style scoped lang="scss">
@import '../../assets/scss/home.scss'; 
header {
    
    display: grid; 
    grid-template-columns: 10fr 2fr;

    .header__content {

        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10px;

        .header__player--is-typing {
            display: inline-block;
            font-size: 0.8rem
        }

    }

    .header__logout {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid map-get($colors, primary);

    }

}

</style>