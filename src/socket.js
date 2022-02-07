import { io } from "socket.io-client"
import config from './config'

console.log('config.API_URL', config.API_URL);
const socket = io(config.API_URL, {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(`Catch-all Listener event: ${event} args : ${args}`);
})

export default socket;