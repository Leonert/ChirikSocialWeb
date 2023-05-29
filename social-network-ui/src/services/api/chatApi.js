import axiosIns from "../../axiosInstance";

export const ChatApi = {
    getUserChats: async () => {
        try {
            const response = await axiosIns.get(`/api/messages`);

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
