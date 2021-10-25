import {useAppContext} from './AppContextProvider.mjs';
import ChatBubble from './ChatBubble.mjs';

export default function ChatArea() {
    const {isLoaded, chatLog, myName} = useAppContext();
    return isLoaded ? chatLog.messages.map(message => ChatBubble({message, myName})) : null;
}
