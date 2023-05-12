import axios from "axios";
import {API_URL} from "../../util/url";


export const ChatApi = {
    sendMessage: async (message) => {
        try {
            await axios.post(`${API_URL}/create`, message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },

    getUserChats: async () => {
        try {
            const response = await axios.get(`${API_URL}/messages`);

            return response.data;
        } catch (error) {
            console.error('Error getting user chats:', error);

            return [];
        }
    },

    createChat: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/create/${userId}`);

            return response.data;
        } catch (error) {
            console.error('Error creating chat:', error);

            return null;
        }
    },

    getAllMessages: async () => {
        try {
            const response = await axios.get(`${API_URL}`);

            return response.data;
        } catch (error) {
            console.error('Error getting all messages:', error);

            return [];
        }
    },

    getChatMessages: async (chatId) => {
        try {
            const response = await axios.get(`${API_URL}/${chatId}/messages`);

            return response.data;
        } catch (error) {
            console.error('Error getting chat messages:', error);

            return [];
        }
    },

    readChatMessages: async (chatId) => {
        try {
            const response = await axios.get(`${API_URL}/${chatId}/read/messages`);

            return response.data;
        } catch (error) {
            console.error('Error marking chat messages as read:', error);

            return [];
        }
    },

    addMessage: async (chatMessage) => {
        try {
            const response = await axios.post(`${API_URL}/create/message`, chatMessage);

            return response.data;
        } catch (error) {
            console.error('Error adding message:', error);

            return null;
        }
    },

    addMessageWithTweet: async (chatMessage) => {
        try {
            const response = await axios.post(`${API_URL}/create/message/tweet`, chatMessage);

            return response.data;
        } catch (error) {
            console.error('Error adding message with tweet:', error);

            return null;
        }
    },
};