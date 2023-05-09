import axios from "axios";
import {API_URL} from "../../util/url";

export const ChatApi = {
    async getUserChats() {
        const { data } = await axios.get(`${API_URL}/messages/users`);

        return data;
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
        const { data } = await axios.post(`${API_URL}/messages/add/message`, chatMessage);

        return data;
    },
    async addMessageWithTweet(chatMessage) {
        const { data } = await axios.post(`${API_URL}/messages/add/message/tweet`, chatMessage);

        return data;
    },
    async getParticipant(payload) {
        const { data } = await axios.get(`${API_URL}/messages/participant/${payload.participantId}/${payload.chatId}`);

        return data;
    },
    async leaveFromConversation(payload) {
        const { data } = await axios.get(`${API_URL}/messages/leave/${payload.participantId}/${payload.chatId}`);

        return data;
    },
};
