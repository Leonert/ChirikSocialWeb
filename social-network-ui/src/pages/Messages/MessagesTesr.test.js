import { render, screen, fireEvent } from '@testing-library/react';
import Messages from './Messages';

describe('Messages component', () => {
    beforeEach(() => {
        render(<Messages />);
    });

    test('renders Messages component', () => {
        // Перевірка, чи відображається компонент
        const messagesComponent = screen.getByTestId('messages-component');
        expect(messagesComponent).toBeInTheDocument();
    });

    test('displays message input', () => {
        // Перевірка, чи відображається поле введення повідомлення
        const messageInput = screen.getByPlaceholderText('Start a new message');
        expect(messageInput).toBeInTheDocument();
    });

    test('sends a message', () => {
        // Симуляція введення повідомлення
        const messageInput = screen.getByPlaceholderText('Start a new message');
        fireEvent.change(messageInput, { target: { value: 'Hello, World!' } });

        // Симуляція натискання кнопки надсилання повідомлення
        const sendButton = screen.getByTestId('send-button');
        fireEvent.click(sendButton);

        // Перевірка, чи було відправлено повідомлення
        // Ви можете додати власні перевірки залежно від очікуваної поведінки
        // наприклад, перевірка відображення нового повідомлення у списку чату або чистоти поля введення повідомлення
        // Використайте методи з бібліотеки testing-library/react для виконання перевірок
    });
});
