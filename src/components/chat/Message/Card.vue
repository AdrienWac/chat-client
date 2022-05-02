<script setup>
import { ref } from 'vue'

const props = defineProps(['message']);

console.log('MESSAGE CARD', props.message);
</script>

<template>
    <div class="message__card">

        <div class="message__aside item__profil-pic" data-state="online">
            <img alt="Vue logo" src="../../../assets/logo.png">
        </div>

        <div class="message__main">

            <div class="message__main-header"> 
                <span data-state="online" class="message__sender"> {{message.sender.username}} </span> 
                <span class="message__time"> &nbsp;{{message.date}} </span> 
            </div>

            <div class="message__content"> {{message.content}} </div>

        </div>

    </div>
</template>

<style lang="scss">

    @import '../../../assets/scss/common.scss'; 

    @media only screen and (max-width: 64em) {
        .message__card {
    
            grid-template-columns: 12fr;
    
            .item__profil-pic {
                display: none;
            }
    
            .message__main {
    
                .message__main-header {
    
                    .message__sender {}
    
                    .message__time {}
    
                }
    
                .message__content {}
    
            }
    
        }
    }

    @media only screen and (min-width: 64.063em) {

        .message__card {
                
            grid-template-columns: 1fr 11fr;

            .message__aside {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .item__profil-pic img {
                width: 32px;
                height: 32px;
            }
    
            .message__main {
    
                .message__main-header {
    
                    .message__sender {}
    
                    .message__time {}
    
                }
    
                .message__content {}
    
            }
    
        }

    }

    .message__card {

        display: grid;
        padding: 15px 10px 15px 5px;

        .message__main {

            text-align: justify;

            .message__main-header {

                margin-bottom: 5px;

                .message__sender {font-weight: bold;}
                .message__time {font-size: 0.8rem;}

            }

            .message__content { margin-top: 5px; }

        }

    }

    
</style>