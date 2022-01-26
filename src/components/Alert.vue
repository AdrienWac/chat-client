<template>
    <div v-show="visible" :class="`alert alert-${type}`" role="alert">
        <span>{{ messsage }}</span>
        <button type="close" @click="close">Close</button>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        type: {
            default() {
                return null;
            },
            validator: function(value) {
                return ['success', 'danger', 'warning', 'info'].indexOf(value) !== -1;
            }
        },
        message: {
            type: String,
            required: true,
            default() {
                return '';
            }
        }
    },
    computed: {
        visible() {
            return this.type !== null && this.message.trim().length > 0; 
        }
    },
    methods: {
        close() {

        }
    }
}
</script>