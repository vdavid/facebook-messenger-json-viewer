import {useAppContext} from './AppContextProvider.mjs';
import ChatBubble from './ChatBubble.mjs';

export default function ChatArea() {
    const {messages, myName} = useAppContext();
    return React.createElement('div', {id: 'chat-display'}, messages.map(message => ChatBubble({message, myName})));
}
