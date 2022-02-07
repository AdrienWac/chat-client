<template>
  <div class="home">

    

    <Aside :users="listUsers" :selectedUser="selectedUser" :room="'sqqs'" @selectionUser="selectUser"/>

    <main :class="`${selectedUser.userId ? 'main--full' : ''}`">

      <div class="forum">

        <div class="forum__header">
          <div :data-state="`${selectedUser.isOnline ? 'online' : 'offline'}`" class="user header__user" v-if="selectedUser.userId">
            {{selectedUser.username}}
          </div>
        </div>
        
        <div class="forum__list">

          <ul v-if ="selectedUser.messages">

            <li v-if ="selectedUser.messages?.length > 0" class="message__card" v-for="message in selectedUser.messages">
              
              <div class="message__aside">
                <img alt="Vue logo" src="../assets/logo.png">
              </div>

              <div class="message__main">

                <div class="message__main-header"> 
                  <span :data-state="`${selectedUser.isOnline ? 'online' : 'offline'}`" class="message__sender user"> {{ message.fromSelf ? user.username : selectedUser.username }} </span> 
                  <span class="message__time"> 04/02/2022 - 14h55 </span> 
                </div>

                <div class="message__content"> {{ message.content }} </div>

              </div>
        
            </li>

            <AlertPage v-else :colors="{icon: `#000`, message:`#000`}">
              <template v-slot:icon>
                <CommentSlash :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="32" width="32" />
              </template>
              <template v-slot:message>Aucun message à afficher</template>
            </AlertPage>
            
          </ul>

          <AlertPage v-else :colors="{icon: `#000`, message:`#000`}">
            <template v-slot:icon>
              <MousePointer :stroke="{color: 'transparent', width:3}" :fill="'#000'" height="32" width="32" />
            </template>
            <template v-slot:message>Sélectionner un utilisateur</template>
          </AlertPage>

        </div>

      </div>
      
      <div class="main__form">

        <div class="form__header" :data-visibility="`${selectedUser.isTyping ? 'show' : 'hidden'}`">
          <div class="header__test">
            <div class="dots-loading">
              <div class="dots-loading__stage">
                <div class="dots-loading__dots"></div>
              </div>
              <div class="dots-loading__content">Username est en train d'écrire</div>
            </div>
          </div>
        </div>

        <Form @sendMessage="sendMessage"/>

      </div>

    </main>
    
  </div>

</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted} from 'vue'
import Aside from '../components/chat/Aside.vue'
import Form from '../components/chat/Form.vue'
import AlertPage from '../components/chat/Alert.vue'
import CommentSlash from '../components/svg/CommentSlash.vue'
import MousePointer from '../components/svg/MousePointer.vue'


export default {
  name: 'Home',
  data: () => ({
    form: {
      username: null
    },
    
  }),
  setup() {

    let listUsers = ref([]);

    let user = JSON.parse(sessionStorage.getItem('user'));

    const initSocket = () => { Socket.auth = user; Socket.connect();}
    
    let selectedUser = ref({});

    const generateListUsers = (arrayUsers) => {

        arrayUsers.forEach(userData => {
            userData.self = userData.userId === Socket.id;
            userData.isTyping = false;
            userData.hasNewMessages = 0;
            userData.isOnline = true;
        });

        return arrayUsers.sort((a, b) => {
            // a sera placé avant b
            if (a.self) return -1;
            // b sera placé avant a
            if (b.self) return 1;
            // Si b est supérieur a a, b sera placé avant a
            if (a.username < b.username) return 1;
            // Si a est supérieur a b, a sera placé avant b
            if (a.username > b.username) return -1;
            // Sinon a & b sont égaux on retourne 0
            return 0;
        });
    }

    Socket.on('users', (usersOnSocket) => {
      listUsers.value = generateListUsers(usersOnSocket);
    });

    Socket.on('user connected', (userInformation) => {
      listUsers.value.push(userInformation);
      listUsers.value = generateListUsers(listUsers.value);
    });

    const selectUser = (user) => {
        user.hasNewMessages = 0;
        selectedUser.value = user;
    };

    const sendMessage = (content) => {
      Socket.emit('private message', {
        content,
        to: selectedUser.value.userId
      });
      selectedUser.value.messages.push({
        content,
        fromSelf: true
      });
    }

    onMounted(() => {
      console.log('INIT SOCKET');
      initSocket();
    });
    
    Socket.on("connect_error", (err) => {
      console.log('errr', err);
      console.log('errr', err, err.message);
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    // Quand je reçois un message privé
    Socket.on('private message', ({content, from, to}) => {
      
      console.log(`receive private message De ${from} Pour ${to} Contenu ${content} . Suis-je bien le destinataire ${to === Socket.id ? 'oui' : 'non'}`);

      for (let index = 0; index < listUsers.value.length; index++) {
      
        const element = listUsers.value[index];

        // On ajoute le message envoyé à la propriété message
        if (element.userId === from) {
          element.messages.push({
            content,
            fromSelf: false
          });

          // Si l'élément courant est l'expéditeur et que je ne l'ai pas sélectionné, je set sa propriété hasNewMessages à true
          if (element !== selectedUser.value) {
            element.hasNewMessages++;
          }

          break;

        }

      }

    });

    // Quand un utilisateur se déconnecte
    Socket.on('user disconected', (userId) => {
      listUsers.value.forEach(user => {
        if (user.userId === userId) {
          user.isOnline = false;
        }
      });
    });
    

    return { listUsers, selectUser, selectedUser, sendMessage, user };

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