import { io } from "socket.io-client"
import config from './config'

const socket = io(config.APP_URL, {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(`Catch-all Listener event: ${event} args : ${args}`);
})

export default socket;