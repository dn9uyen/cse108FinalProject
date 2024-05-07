import { io } from 'socket.io-client';

export const gameSocket = io("127.0.0.1:5000/game", { autoConnect: false });
export const lobbySocket = io("127.0.0.1:5000/lobby", { autoConnect: false });
