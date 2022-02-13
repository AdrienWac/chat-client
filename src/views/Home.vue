<template>
  <div class="home">
    
    <Aside :listUsers="listUsers"/>

  </div>

</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted, watch, computed} from 'vue'
import Aside from '../components/chat/Aside.vue'
import Form from '../components/chat/Form.vue'
import AlertPage from '../components/chat/Alert.vue'
import CommentSlash from '../components/svg/CommentSlash.vue'
import MousePointer from '../components/svg/MousePointer.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
  name: 'Home',
  data: () => ({
    form: {
      username: null
    },
    
  }),
  setup() {
    const store = useStore();
    const router = useRouter();
    let listUsers = ref([]);
    let message = ref('');

    let user = JSON.parse(localStorage.getItem('user'));


    const initSocket = () => { 
      Socket.auth = {...user};
      Socket.connect();
    }

    Socket.on('user connected', (userInformation) => store.dispatch('chat/setUserConnectedStatus', {user: userInformation, status: true}));

    onMounted(() => {
      initSocket();
    });
    
    Socket.on('users', (arrayUsers) => store.dispatch('chat/generateListUsers', arrayUsers));

    Socket.on("connect_error", (err) => {
      console.log('errr', err, err.message);
    });

    // Quand un utilisateur se déconnecte
    Socket.on('user disconected', (userInformation) => store.dispatch('chat/setUserConnectedStatus', {user: userInformation, status: false}));

    Socket.on('signout', async (user) => {
      
      const userFromStorage = JSON.parse(localStorage.getItem('user'));

      await store.dispatch('user/logout', user);
      
      router.push({name: 'Login'});
      
    })
    
    return { message, listUsers};

  },
  components: {
    Aside,
    Form,
    AlertPage,
    CommentSlash,
    MousePointer
  }
}
</script>
<style scoped lang="scss">

.user {font-weight: normal;font-size: 1.1rem;}
.user:before {
  content: '';
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}

.user[data-state="online"]:before {background-color: map-get($colors, online);}
.user[data-state="offline"]::before {background-color: map-get($colors, offline);}

.home {

  font-family: $oswald;
  font-weight: lighter;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 100%;

  // aside{background: map-get($colors, primary);}

  main{
    
    // background: map-get($colors, second);
    display: grid;
    grid-template-rows: 100vh;
    transition: all 1s;
    
    .forum {

      display: grid;
      grid-template-rows: 10% 90%;

      .forum__header {

        min-width: 320px;
        max-width: 100%;
        position: relative;
        padding: 10px 0 10px 5px;
        border-bottom: 1px solid map-get($colors, primary);
        display: flex;
        flex-direction: column;
        justify-content: center;
        

      }

      .forum__list {
        
        overflow-y: auto;
        
        ul {height: 100%;}

        ::v-deep .alert--page {
          font-size: 1.5rem;
          text-align: center;
        }

        .message__card {

          padding: 15px 10px 15px 5px;
          display: grid;
          grid-template-columns: 1fr 11fr;

          .message__aside {
            
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;

            img {max-width:32px; max-height: 32px;}

          }

          .message__main-header {
            .message__time{ font-size: 0.7rem; color: lighten(map-get($fontColors, primary), 20%);}
          }

          .message__content {
            line-height: 1.2rem;
            padding: 5px 0;
            font-size: 1.05rem;
            text-align: justify;
          }

        }

      } 

    }

    .main__form {

      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px solid map-get($colors, primary);
      padding: 5px;

      .form__header{ display: none; }

      ::v-deep .form {
        display: grid;
        grid-template-columns: 9fr 3fr;

        textarea {
          width:100%;
          min-height: 50px;
        }

        button {background: map-get($colors, primary);border: none;}
        button:disabled, button:disabled:hover {background: rgba(map-get($colors, primary), 0.4); cursor: not-allowed;}
        button:hover {background: rgba(map-get($colors, primary), 0.7); cursor: pointer;}

        
      }

    }

    

  }

  .main--full{
    
    grid-template-rows: 80vh 20vh;

    .main__form {

      .form__header[data-visibility="hidden"]{animation-duration: 1s; animation-name: hiddeHeader;animation-fill-mode: forwards;}
      .form__header[data-visibility="show"]{ animation-duration: 1s; animation-name: displayHeader;animation-fill-mode: forwards;}

      @keyframes displayHeader {
        from {
          bottom: 60px;
        }
        to {
          bottom: 112px;
        }
      }

      @keyframes hiddeHeader {
        from {
          bottom: 112px;
        }
        to {
          bottom: 60px;
        }
      }
      
      .form__header {

        display: block;
        position: absolute;
        width: 100%;
        z-index:-1;

        

        .header__test {

          display: flex;
          flex-direction: column;
          justify-content: center;

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
        }

      }
    }
    
  }


}
</style>