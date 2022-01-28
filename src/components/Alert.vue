<template>
    <div v-show="visible" :class="`alert alert-${type}`" role="alert">
        <div class="alert__message" v-html="message"></div>
        <div class="alert__container-button">
            <button class="alert__button" type="close" @click="close">x</button>
        </div>

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
            this.$emit('close');
        }
    }
}
</script>

<style scoped lang="scss">

    .alert{

        display: grid;
        grid-template-columns: 9fr 1fr;
        padding: .75rem 1.25rem;

        .alert__container-button {
            display: flex;
            justify-content: end;
            align-items: center;

            .alert__button {
                padding: 0.75rem 1.25rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 1;
            }
            .alert__button:hover{cursor: pointer;}
        }

    }

    $darkeningPercentage: 20%;

    @each $type, $color in $alertColorsByType {

        .alert-#{$type} {
            background: $color;
            color: darken($color, $darkeningPercentage);
            .alert__button {
                color: darken($color, $darkeningPercentage);
            }
        }

    }

</style>