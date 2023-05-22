import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {ChatApi} from "../../services/api/chatApi";
export const sendMessage = createAsyncThunk('api/messages/sendMessage', async (message) => {
    try {
        const createdMessage = await ChatApi.sendMessage(message);

        return { chatId: message.chatId, message: createdMessage };
    } catch (error) {
        throw new Error('Error sending message:', error);
    }
});

export const fetchChat = createAsyncThunk('api/messages/fetchChat', async () => {
    try {
        return await ChatApi.getUserChats();
    } catch (error) {
        throw new Error('Error fetching user chats:', error);
    }
});

export const fetchChatMessages = createAsyncThunk('api/messages/fetchChatMessages', async (chatId, { getState }) => {
    try {
        const chatMessages = await ChatApi.getChatMessages(chatId);
        const { message } = getState().messages;

        return { chatId, messages: chatMessages, message };
    } catch (error) {
        throw new Error('Error fetching chat messages:', error);
    }
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        chats: [],
        messages: {},
        selectedChatId: null,
        participant: null,
        text: '',
        visibleModalWindow: false,
    },
    reducers: {
        setSelectedChatId: (state, action) => {
            state.selectedChatId = action.payload;
            state.participant = state.chats.find((chat) => chat.id === action.payload);
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        toggleModalWindow: (state) => {
            state.visibleModalWindow = !state.visibleModalWindow;
        },
        setMessage: (state, action) => {
            const { chatId, message } = action.payload;

            if (state.messages[chatId]) {
                if (Array.isArray(state.messages[chatId])) {
                    state.messages[chatId] = [...state.messages[chatId], message];
                } else {
                    state.messages[chatId] = [state.messages[chatId], message];
                }
            } else {
                state.messages[chatId] = [message];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { chatId, message } = action.payload;

                if (state.messages[chatId]) {
                    if (Array.isArray(state.messages[chatId])) {
                        state.messages[chatId] = [...state.messages[chatId], message];
                    } else {
                        state.messages[chatId] = [state.messages[chatId], message];
                    }
                } else {
                    state.messages[chatId] = [message];
                }
            })
            .addCase(fetchChat.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                const { chatId, messages } = action.payload;

                if (Array.isArray(state.messages[chatId])) {
                    state.messages[chatId] = [...state.messages[chatId], ...messages];
                } else {
                    state.messages[chatId] = messages;
                }
            });
    },
});

export const {
    setSelectedChatId,
    setText,
    toggleModalWindow,
    setMessage,
} = messagesSlice.actions;

export const selectChats = (state) => state.messages.chats;
export const selectMessages = (state) => state.messages.messages;

export const selectSelectedChatId = (state) => state.messages.selectedChatId;
export const selectParticipant = (state) => state.messages.participant;
export const selectText = (state) => state.messages.text;
export const selectVisibleModalWindow = (state) => state.messages.visibleModalWindow;

export default messagesSlice.reducer;
