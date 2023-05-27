import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {ChatApi} from "../../services/api/chatApi";
import axiosIns from "../../axiosInstance";
export const sendMessage = createAsyncThunk(
    'api/messages/sendMessage',
    async ({ chatId, message, senderId, recipientId }) => {
        const messageDto = {
            chatId,
            message,
            senderId,
            recipientId,
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
            state.messages[chatId] = [...(state.messages[chatId] || []), message];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { chatId, message } = action.payload;

                if (state.messages[chatId]) {
                    state.messages[chatId] = [...state.messages[chatId], message];
                } else {
                    state.messages[chatId] = [message];
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
export const selectMessages = (state) => {
    const selectedChatId = state.messages.selectedChatId;

    return state.messages.messages[selectedChatId] || [];
};
export const selectSelectedChatId = (state) => state.messages.selectedChatId;
export const selectText = (state) => state.messages.text;
export const selectVisibleModalWindow = (state) =>
    state.messages.visibleModalWindow;

export default messagesSlice.reducer;
