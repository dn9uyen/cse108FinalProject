import { io } from 'socket.io-client';

export const socket = io("127.0.0.1:5000/game", { autoConnect: false });
