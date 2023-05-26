import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {ChatApi} from "../../services/api/chatApi";


export const sendMessage = createAsyncThunk(
    'api/messages/sendMessage',
    async ({ chatId, message }, { getState }) => {
        try {
            const createdMessage = await ChatApi.sendMessage(chatId, message);

            return { chatId, message: createdMessage };
        } catch (error) {
            throw new Error('Error sending message:', error);
        }
    }
);


export const fetchChat = createAsyncThunk(
    'api/messages/fetchChat',
    async () => {
        try {
            const chats = await ChatApi.getUserChats();

            return chats;
        } catch (error) {
            throw new Error('Error fetching user chats:', error);
        }
    }
);

export const fetchChatMessages = createAsyncThunk(
    'api/messages/fetchChatMessages',
    async (chatId) => {
        try {
            const chatMessages = await ChatApi.getChatMessages(chatId);

            return { chatId, messages: chatMessages };
        } catch (error) {
            throw new Error('Error fetching chat messages:', error);
        }
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
            const selectedChatId = action.payload;
            state.selectedChatId = selectedChatId;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        toggleModalWindow: (state) => {
            state.visibleModalWindow = !state.visibleModalWindow;
        },

        setMessage: (state, action) => {
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
    setMessage,
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
