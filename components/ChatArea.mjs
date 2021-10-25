import {useAppContext} from './AppContextProvider.mjs';
import ChatBubble from './ChatBubble.mjs';

export default function ChatArea() {
    const {isLoaded, chatLog, myName} = useAppContext();
    return isLoaded ? React.createElement('div', {id: 'chat-display'}, chatLog.messages.map(message => ChatBubble({message, myName}))) : null;
}
