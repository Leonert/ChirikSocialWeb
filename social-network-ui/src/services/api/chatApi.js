import axios from "axios";
import {API_URL} from "../../util/url";

export const ChatApi = {

    sendMessage: async (message) => {
        try {
            await axios.post(`${API_URL}/messages/create`, message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },

    async getUserChats() {
        try {
            const response = await axios.get(`${API_URL}/messages`);

            return response.data;
        } catch (error) {
            console.error('Error getting user chats:', error);

            return [];
        }
    },
    async createChat(userId) {
        const { data } = await axios.get(`${API_URL}/messages/create/${userId}`);

        return data;
    },
    async getChatMessages(chatId) {
        const { data } = await axios.get(`${API_URL}/messages/${chatId}/messages`);

        return data;
    },
    async readChatMessages(chatId) {
        const { data } = await axios.get(`${API_URL}/messages/${chatId}/read/messages`);

        return data;
    },
    async addMessage(chatMessage) {
        const { data } = await axios.post(`${API_URL}/messages/create/message`, chatMessage);

        return data;
    },
    async addMessageWithTweet(chatMessage) {
        const { data } = await axios.post(`${API_URL}/messages/create/message/tweet`, chatMessage);

        return data;
    },
};
