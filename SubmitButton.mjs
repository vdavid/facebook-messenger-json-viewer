import ChatArea from './ChatArea.mjs';
import ChatBubble from './ChatBubble.mjs';
import {useAppContext} from './AppContextProvider.mjs';

export default function SubmitButton() {
    const {messages, myName} = useAppContext();
    return React.createElement('button', {onClick: () => handleSubmit(messages, myName)}, 'Submit');
}

function handleSubmit(messages, myName) {
    ReactDOM.render(React.createElement(ChatArea), document.querySelector('#chat-area'));
    const domChat = document.querySelector('#chat-display');
    ReactDOM.render(React.createElement(ChatBubble, {messages: cleanedData.msgs, myName}), domChat);
    addChatTitle();
}

function addChatTitle(cleanedData) {
    const chatTitle = document.querySelector('#chat-title');
    ReactDOM.render(React.createElement('h2', {}, cleanedData.title), chatTitle);
}
