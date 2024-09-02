import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // Corrected `reciverId` to `receiverId`
        const senderId = req.user._id; // Changed `req.user_id` to `req.user._id`

        // Find or create the conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId, // Corrected `reciverId` to `receiverId`
            message
        });

        // Save the new message and update the conversation
        await Promise.all([
            newMessage.save(), // Save the new message
            conversation.updateOne({ $push: { messages: newMessage._id } }) // Add message to conversation
        ]);

        res.status(201).json(newMessage); // Corrected status code to 201

    } catch (error) {
        console.log("Error in sendMessage controller:", error.message); // Improved logging message
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // Corrected `req.prams` to `req.params`
        const senderId = req.user._id; // Changed `req.user_id` to `req.user._id`

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);

        const messages =  conversation.messages;
        }

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessage controller:", error.message); // Improved logging message
        res.status(500).json({ error: "Internal Server Error" });
    }
};
