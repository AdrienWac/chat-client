<template>
    <div class="dots-loading">
        <div class="dots-loading__stage">
            <div class="dots-loading__dots"></div>
        </div>
        <!-- TODO gérer le passage en props du text et l'affichage ou non -->
        <div class="dots-loading__content">Username est en train d'écrire</div>
    </div>
</template>

<style scoped lang="scss">
.dots-loading {
    display: grid;
    grid-template-columns: 0.5fr 11.5fr;
}

.dots-loading__stage {
    display: flex;
    justify-content: start;
    align-items: center;
    position: relative;
    padding: 1rem 0;
    overflow: hidden;
}

.dots-loading__dots{
    position: relative;
    margin-left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: .5s;
}

.dots-loading__dots::before, .dots-loading__dots::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
}

.dots-loading__dots::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
}

.dots-loading__dots::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
}

.dots-loading__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5px;
}

@keyframes dotFlashing {
    0% {
        background-color: #9880ff;
    }
    50%,
    100% {
        background-color: #ebe6ff;
    }
}
</style>