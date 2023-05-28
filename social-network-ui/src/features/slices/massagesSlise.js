import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {ChatApi} from "../../services/api/chatApi";
import axiosIns from "../../axiosInstance";
export const sendMessage = createAsyncThunk(
    'api/messages/sendMessage',
    async ({ chatId, message, senderId, recipientId }) => {
        const trimmedMessage = message.trim();

        const messageDto = {
            chatId,
            message: trimmedMessage,
            senderId,
            recipientId,
            isRead: true,
            messageId: null,
        };

        console.log('Sending message:', messageDto);

        try {
            const response = await axiosIns.post(
                `/api/messages/chats/${chatId}/add-message`,
                messageDto
            );
            const createdMessage = response.data;

            return { chatId, message: createdMessage, senderId, recipientId };
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
);

export const fetchChat = createAsyncThunk(
    'api/messages/fetchChat',
    async () => {
        const chats = await ChatApi.getUserChats();

        return chats;
    }
);

export const fetchChatMessages = createAsyncThunk(
    'api/messages/fetchChatMessages',
    async (chatId) => {
        const chatMessages = await ChatApi.getChatMessages(chatId);

        return { chatId, messages: chatMessages };
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        chats: [],
        users: [],
        messages: {},
        selectedChatId: null,
        text: '',
        visibleModalWindow: false,
    },
    reducers: {
        setSelectedChatId: (state, action) => {
            state.selectedChatId = action.payload;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        toggleModalWindow: (state) => {
            state.visibleModalWindow = !state.visibleModalWindow;
        },
        addChatMessage: (state, action) => {
            const { chatId, message } = action.payload;

            console.log('chatId:', chatId);
            console.log('message:', message);

            const chat = state.messages[chatId];

            if (chat) {
                const updatedMessage = {
                    ...message,
                    recipientId: message.recipientId || chat.messages[0]?.recipientId,
                    senderId: message.senderId || chat.messages[0]?.senderId,
                };

                state.messages[chatId] = {
                    ...chat,
                    messages: [...chat.messages, updatedMessage],
                };
            }

            // Оновлення даних про користувачів
            const users = state.chats.map(chat => ({
                chatId: chat.chatId,
                senderId: chat.senderId,
                recipientId: chat.recipientId,
            }));
            state.users = users;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { chatId, message, senderId, recipientId } = action.payload;

                const chat = state.messages[chatId];

                if (chat) {
                    const updatedMessage = {
                        ...message,
                        recipientId: recipientId || chat.recipientId,
                        senderId: senderId || chat.senderId,
                    };

                    state.messages[chatId] = {
                        ...chat,
                        messages: [...chat.messages, updatedMessage],
                    };
                }
            })
            .addCase(fetchChat.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                const { chatId, messages } = action.payload;
                state.messages[chatId] = messages;
            });
    },
});

export const {
    setSelectedChatId,
    setText,
    toggleModalWindow,
    addChatMessage,
} = messagesSlice.actions;

export const selectChats = (state) => state.messages.chats;
export const selectUsers = (state) => state.messages.users;
export const selectMessages = (state) => {
    const selectedChatId = state.messages.selectedChatId;

    return state.messages.messages[selectedChatId] || [];
};
export const selectSelectedChatId = (state) => state.messages.selectedChatId;
export const selectText = (state) => state.messages.text;
export const selectVisibleModalWindow = (state) =>
    state.messages.visibleModalWindow;

export default messagesSlice.reducer;
