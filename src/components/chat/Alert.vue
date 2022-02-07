<template>
    <div :class="`alert--page alert__container`" >
        <div class="alert__content">
            <div class="icon" :style="color.icon">
                <slot name="icon"></slot>
            </div>
            <div class="message" :style="color.message">
                <slot name="message"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        colors: {
            type: Object,
            default() {
                return {icon: '#000', message: '#000'};
            }
        }
    },
    computed: {
        color() {
            return {
                icon: `--color:${this.colors.icon}`,
                message: `--color:${this.colors.message}`
            };
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss">

    .icon, .message {color: var(--color);}
    .alert__container {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>