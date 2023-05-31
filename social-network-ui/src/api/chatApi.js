import axiosIns from "../axiosInstance";
import {useSelector} from "react-redux";

export const ChatApi = {
    getUserChats: async (userId) => {
        try {
            const response = await axiosIns.get(`/api/messages`, {
                params: {
                    userId: userId,
                },
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            return [];
        }
    },

    getChatMessages: async (chatId) => {
        try {
            const response = await axiosIns.get(`/api/messages/chats/${chatId}`);

            return response.data;
        } catch (error) {

            return [];
        }
    }
};
