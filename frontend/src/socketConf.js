import io from 'socket.io-client';


const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL); // Use the environment variable

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

export default socket;
