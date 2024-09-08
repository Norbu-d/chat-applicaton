import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Get the userId from the socket handshake
    const userId = socket.handshake.query.userId;

    // Check if userId is valid before adding to userSocketMap
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} connected`);
    }

    // Emit the online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log(`User ${userId} disconnected`, socket.id);

        // Remove user from userSocketMap when they disconnect
        delete userSocketMap[userId];

        // Emit the updated list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
