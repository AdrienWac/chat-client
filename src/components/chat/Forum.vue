<script setup>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import AlertPage from './Alert.vue'
    import MousePointer from '../svg/MousePointer.vue'

    const store = useStore();

    let selectedUser = computed(() => store.getters['chat/selectedUser']);

</script>

<template>

    <div v-if="selectedUser.id">
        
    </div>

    <AlertPage v-else :colors="{icon: `#000`, message:`#000`}">
        <template v-slot:icon>
            <MousePointer :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="32" width="32" />
        </template>
        <template v-slot:message>Sélectionner un utilisateur</template>
    </AlertPage>

</template>