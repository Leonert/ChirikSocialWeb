import axiosIns from "../../axiosInstance";
import {API_URL} from "../../util/url";
import axios from "axios";


export const ChatApi = {
    sendMessage: async (message) => {
        try {
            const response = await axiosIns.post(`/messages/create`, {
                id: message.id,
                date: message.date,
                message: message.text,
                isRead: message.isRead,
                timestamp: new Date().toISOString(),
            });

            const createdMessage = response.data;
            console.log('Message sent successfully');
            console.log('Created Message:', createdMessage);

            return createdMessage;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },



    getUserChats: async () => {
        try {
            const response = await axiosIns.get(`/messages`);

            return response.data;
        } catch (error) {
            console.error('Error fetching user chats:', error);

            return [];
        }
    },

    createChat: async (userId) => {
        try {
            const response = await axiosIns.get(`/messages/create/${userId}`);

            return response.data;
        } catch (error) {
            console.error('Error creating chat:', error);

            return null;
        }
    },

    getAllMessages: async () => {
        try {
            const response = await axiosIns.get(`/messages`);

            return response.data;
        } catch (error) {
            console.error('Error fetching all messages:', error);

            return [];
        }
    },

    getChatMessages: async (chatId) => {
        try {
            const response = await axiosIns.get(`/messages/${chatId}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching chat messages:', error);

            return [];
        }
    },

    readChatMessages: async (chatId) => {
        try {
            await axiosIns.put(`${API_URL}/messages/${chatId}/read`);
        } catch (error) {
            console.error('Error marking chat messages as read:', error);
        }
    },

    addMessage: async (chatMessage) => {
        try {
            const response = await axiosIns.post(`${API_URL}/messages/create`, chatMessage);

            return response.data;
        } catch (error) {
            console.error('Error adding chat message:', error);

            return null;
        }
    },

    addMessageWithTweet: async (chatMessage) => {
        try {
            const response = await axiosIns.post(`${API_URL}/messages/create`, chatMessage);

            return response.data;
        } catch (error) {
            console.error('Error adding chat message with tweet:', error);

            return null;
        }

    },
    getUserList: async () => {
        try {
            const response = await axiosIns.get(`${API_URL}/messages/users`);

            return response.data;
        } catch (error) {
            console.error('Error fetching user list:', error);

            return [];
        }
    },
}