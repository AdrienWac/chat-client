<template>
  <div class="home">
    <Aside :users="listUsers" :room="'sqqs'" @selectionUser="selectUser"/>

    <main>

      <div class="forum">

        <div class="forum__header">
          <!-- <div class="user header__user" v-if="selectedUser.userId">{{selectedUser.username}}</div> -->
          <div data-state="offline" class="user header__user">Lorem Ipsum is simply dummy text of</div>
        </div>
        
        <div class="forum__list">
          <ul>

            <li class="message__card">
              
              <div class="message__aside">
                <img alt="Vue logo" src="../assets/logo.png">
              </div>

              <div class="message__main">

                <div class="message__main-header"> 
                  <span data-state="offline" class="message__sender user"> AdrienLbt </span> 
                  <span class="message__time"> 04/02/2022 - 14h55 </span> 
                </div>

                <div class="message__content"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>

              </div>
        
            </li>

            <li class="message__card">
              
              <div class="message__aside">
                <img alt="Vue logo" src="../assets/logo.png">
              </div>

              <div class="message__main">

                <div class="message__main-header"> 
                  <span data-state="offline" class="message__sender user"> AdrienLbt </span> 
                  <span class="message__time"> 04/02/2022 - 14h55 </span> 
                </div>

                <div class="message__content"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>

              </div>
        
            </li>

            <li class="message__card">
              
              <div class="message__aside">
                <img alt="Vue logo" src="../assets/logo.png">
              </div>

              <div class="message__main">

                <div class="message__main-header"> 
                  <span data-state="offline" class="message__sender user"> AdrienLbt </span> 
                  <span class="message__time"> 04/02/2022 - 14h55 </span> 
                </div>

                <div class="message__content"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>

              </div>
        
            </li>

            <li class="message__card">
              
              <div class="message__aside">
                <img alt="Vue logo" src="../assets/logo.png">
              </div>

              <div class="message__main">

                <div class="message__main-header"> 
                  <span data-state="offline" class="message__sender user"> AdrienLbt </span> 
                  <span class="message__time"> 04/02/2022 - 14h55 </span> 
                </div>

                <div class="message__content"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>

              </div>
        
            </li>
            
            <!-- <li class="list__item" v-for="message in selectedUser.messages">
                <span>{{message.fromSelf ? "Moi" : selectedUser.username}}</span>
                <span>{{message.content}}</span>
            </li> -->
          </ul>
        </div>
        
        <div class="forum__footer">
          <div class="forum__footer-content">Username est en train d'écrire</div>
        </div>

      </div>

      <Form @sendMessage="sendMessage"/>
      <!-- <Form @sendMessage="sendMessage" v-if="selectedUser.userId"/> -->

    </main>
    
  </div>

</template>

<script>
// @ is an alias to /src
import Socket from '../socket'
import {ref, onMounted} from 'vue'
import Aside from '../components/chat/Aside.vue'
import Form from '../components/chat/Form.vue'


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
      initSocket();
    });
    
    Socket.on("connect_error", (err) => {
      console.log('errr', err);
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
            element.hasNewMessages = true;
          }

          break;

        }

      }

    });

    return { listUsers, selectUser, selectedUser, sendMessage };
  },
  components: {
    Aside,
    Form
  }
}
</script>
<style scoped lang="scss">

.user:before {
  content: '';
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}

.user[data-state="online"]:before {background-color: greenyellow;}
.user[data-state="offline"]::before {background-color: black;}

.home {

  font-family: $oswald;
  font-weight: lighter;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;

  aside{background: map-get($colors, primary);}

  main{
    
    background: map-get($colors, second);
    display: grid;
    grid-template-rows: 80% 20%;
    
    .forum {

      display: grid;
      grid-template-rows: 10% 80% 10%;

      .forum__header {

        min-width: 320px;
        max-width: 100%;
        position: relative;
        padding: 10px 0 10px 5px;
        border-bottom: 1px solid #eef0f2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        

      }

      .forum__list {
        
        overflow-y: scroll;

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
            .message__sender{ font-weight: normal;font-size: 1.1rem;}
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

      .forum__footer {

        border-top: 1px solid #eef0f2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 15px 5px;

      }

    }

    ::v-deep .form {
      display: grid;
      grid-template-columns: 9fr 3fr;
      padding: 5px 5px 15px 5px;

      textarea {
        width:100%;
      }

      
    }

  }



}
</style>