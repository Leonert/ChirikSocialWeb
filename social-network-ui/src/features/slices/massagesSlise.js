import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {ChatApi} from "../../services/api/chatApi";
import axiosIns from "../../axiosInstance";
export const sendMessage = createAsyncThunk(
    'api/messages/sendMessage',
    async ({ chatId, message }, { getState, dispatch }) => {
        const state = getState();
        const trimmedMessage = message.trim();
        const chatIndex = state.messages.chats.findIndex((chat) => chat.chatId === chatId);

        if (chatIndex !== -1) {
            const chat = state.messages.chats[chatIndex];
            const messageDto = {
                chatId,
                message: trimmedMessage,
                senderId: chat.senderId,
                recipientId: chat.recipientId,
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

                dispatch(addChatMessage({ chatId, message: createdMessage }));

                return {
                    chatId,
                    message: createdMessage,
                    senderId: chat.senderId,
                    recipientId: chat.recipientId,
                };
            } catch (error) {
                console.error('Error sending message:', error);
                throw error;
            }
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
    async (chatId, { rejectWithValue }) => {
        try {
            const chatMessages = await ChatApi.getChatMessages(chatId);

            return { chatId, messages: chatMessages };
        } catch (error) {
            return rejectWithValue(error.message);
        }
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

            const chatIndex = state.chats.findIndex((chat) => chat.chatId === chatId);

            if (chatIndex !== -1) {
                const chat = state.chats[chatIndex];

                const updatedMessage = {
                    ...message,
                    recipientId: message.recipientId || chat.messages?.[0]?.recipientId,
                    senderId: message.senderId || chat.messages?.[0]?.senderId,
                };

                const updatedChat = {
                    ...chat,
                    messages: chat.messages ? [...chat.messages, updatedMessage] : [updatedMessage],
                };

                state.chats[chatIndex] = updatedChat;


                if (state.chats[chatIndex].messages) {
                    state.chats[chatIndex].messages = [...state.chats[chatIndex].messages, updatedMessage];
                } else {
                    state.chats[chatIndex].messages = [updatedMessage];
                }
            }

            const users = state.chats.map((chat) => ({
                chatId: chat.chatId,
                senderId: chat.senderId,
                recipientId: chat.recipientId,
            }));
            state.users = users;

            if (state.selectedChatId !== chatId) {
                state.selectedChatId = chatId;
            }
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { chatId, message, senderId, recipientId } = action.payload;

                const chatIndex = state.chats.findIndex((chat) => chat.chatId === chatId);

                if (chatIndex !== -1) {
                    const updatedMessage = {
                        ...message,
                        recipientId: recipientId || state.chats[chatIndex].recipientId,
                        senderId: senderId || state.chats[chatIndex].senderId,
                    };

                    // Перевірка, чи messages вже існує та є масивом
                    if (state.chats[chatIndex].messages) {
                        state.chats[chatIndex].messages.push(updatedMessage);
                    } else {
                        state.chats[chatIndex].messages = [updatedMessage]; // Якщо messages не існує, створюємо новий масив
                    }
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

