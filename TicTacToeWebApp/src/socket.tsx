import { io } from 'socket.io-client';

export const gameSocket = io("/game", { autoConnect: false });
export const lobbySocket = io("/lobby", { autoConnect: false });
