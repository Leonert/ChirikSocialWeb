import axios from "axios";
import {API_URL} from "../../util/url";


export const ChatApi = {
    sendMessage: async (message) => {
        try {
            await axios.post(`${API_URL}/messages/create`, message);
        } catch (error) {

        }
    },

    getUserChats: async () => {
        try {
            const response = await axios.get(`${API_URL}/messages`);

            return response.data;
        } catch (error) {


            return [];
        }
    },

    createChat: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/messages/create/${userId}`);

            return response.data;
        } catch (error) {


            return null;
        }
    },

    getAllMessages: async () => {
        try {
            const response = await axios.get(`${API_URL}/messages`);

            return response.data;
        } catch (error) {


            return [];
        }
    },

    getChatMessages: async (chatId) => {
        try {
            const response = await axios.get(`${API_URL}/messages/${chatId}`);

            return response.data;
        } catch (error) {


            return [];
        }
    },

    readChatMessages: async (chatId) => {
        try {
            await axios.put(`${API_URL}/messages/${chatId}/read`);
        } catch (error) {

        }
    },

    addMessage: async (chatMessage) => {
        try {
            const response = await axios.post(`${API_URL}/messages/create`, chatMessage);

            return response.data;
        } catch (error) {


            return null;
        }
    },

    addMessageWithTweet: async (chatMessage) => {
        try {
            const response = await axios.post(`${API_URL}/messages/create`, chatMessage);

            return response.data;
        } catch (error) {


            return null;
        }
    },
};