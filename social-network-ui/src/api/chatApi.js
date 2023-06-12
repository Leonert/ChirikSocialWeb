import axiosIns from "../axiosInstance";

export const ChatApi = {
    getUserChats: async (userId) => {
        try {
            if (!userId) {
                throw new Error('Missing userId');
            }

            const response = await axiosIns.get(`/api/messages`, {
                params: {
                    userId,
                },
            });

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
    },
};
