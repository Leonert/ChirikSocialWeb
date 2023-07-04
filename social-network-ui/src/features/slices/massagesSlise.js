import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatApi } from "../../api/chatApi";
import axiosIns from "../../axiosInstance";


export const sendMessage = createAsyncThunk(
    'api/messages/sendMessage',
    async ({ chatId, message,authorId ,senderUsername, recipientUsername }, { getState, dispatch }) => {
        const state = getState();
        const trimmedMessage = message.trim();
        const chatIndex = state.messages.chats.findIndex((chat) => chat.chatId === chatId);


        if (chatIndex !== -1) {
            const chat = state.messages.chats[chatIndex];


            const messageDto = {
                chatId,
                message: trimmedMessage,
                senderId: authorId,
                recipientId: chat.recipientId,
                isRead: false,
                messageId: null,
                senderUsername,
                recipientUsername,
            };
            const response = await axiosIns.post(`/api/messages/chats/${chatId}/add-message`, messageDto);
            const createdMessage = response.data;
            createdMessage.messageId = createdMessage.messageId || null;

            dispatch(addChatMessage({ chatId, message: createdMessage }));

            return {
                chatId,
                message: createdMessage,
                senderId: chat.senderId,
                recipientId: chat.recipientId,
            };
        }
    }
);

const updateChat = createAsyncThunk(
    'messages/updateChat',
    async ({ chatId, chat }) => {
        return { chatId, chat };
    }
);


export const fetchChat = createAsyncThunk(
    'api/messages/fetchChat',
    async (userId) => {
        const chats = await ChatApi.getUserChats(userId);

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
        messages: {},
        selectedChatId: null,
        text: '',
        visibleModalWindow: false,
        users:[],
        authorId: ''
    },
    reducers: {
        getAuthorId: (state, action) => {
            state.authorId = action.payload;
        },
        setSelectedChatId: (state, action) => {
            state.selectedChatId = action.payload;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        toggleModalWindow: (state) => {
            state.visibleModalWindow = !state.visibleModalWindow;
        },
        addChat: (state, action) => {
            const newChat = action.payload;
            state.chats.push(newChat.messages[1]);
        },

        delletedChats: (state, action)=>{
            state.chats = state.chats.filter(chat => chat.chatId !== action.payload)
        },
        addChatMessage: (state, action) => {
            const { chatId, message } = action.payload;
            const chat = state.chats.find((chat) => chat.chatId === chatId);

            if (chat) {
                const updatedMessage = {
                    ...message,
                    senderId: chat.senderId,
                    recipientId: chat.recipientId,
                };

                if (chat.messages) {
                    chat.messages.push(updatedMessage);
                } else {
                    chat.messages = [updatedMessage];
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
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { chatId, message, senderId, recipientId } = action.payload;

                const chatIndex = state.chats.findIndex((chat) => chat.chatId === chatId);
                if (chatIndex !== -1) {
                    const updatedMessage = {
                        ...message,
                        recipientId: recipientId || state.chats[chatIndex].senderId,
                        senderId: senderId || state.chats[chatIndex].recipientId,
                    };

                    if (state.chats[chatIndex].messages) {
                        state.chats[chatIndex].messages.push(updatedMessage);
                    } else {
                        state.chats[chatIndex].messages = [updatedMessage];
                    }

                    if (updatedMessage.senderId === state.chats[chatIndex].authorId) {
                        updatedMessage.isRead = true;
                    }
                }
                const updatedChat = {
                    ...state.chats[chatIndex],
                    senderId: senderId || state.chats[chatIndex].senderId,
                    recipientId: recipientId || state.chats[chatIndex].recipientId,
                };
                updateChat({ chatId, chat: updatedChat });
            })

            .addCase(fetchChat.fulfilled, (state, action) => {
                state.chats = action.payload;
            })

            .addCase(updateChat.fulfilled, (state, action) => {
                const { chatId, chat } = action.payload;
                const chatIndex = state.chats.findIndex(
                    (chat) => chat.chatId === chatId
                );
                if (chatIndex !== -1) {
                    state.chats[chatIndex] = chat;
                }
            })
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                const { chatId, messages } = action.payload;
                state.messages[chatId] = messages;
            });

    },
});

export const {
    delletedChats,
    addChat,
    setSelectedChatId,
    setText,
    toggleModalWindow,
    addChatMessage,
    getAuthorId
} = messagesSlice.actions;

export const selectChats = (state) => state.messages.chats;
export const selectMessages = (state) => {
    const selectedChatId = state.messages.selectedChatId;

    return state.messages.messages[selectedChatId] || [];
};
export const selectSelectedChatId = (state) => state.messages.selectedChatId;
export const selectVisibleModalWindow = (state) =>
    state.messages.visibleModalWindow;

export default messagesSlice.reducer;