import io from 'socket.io-client'

const socketUrl = "http://192.168.31.29:3333";
const socket = io(socketUrl);

export default socket;
