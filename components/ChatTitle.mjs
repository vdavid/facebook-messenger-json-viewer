import {useAppContext} from './AppContextProvider.mjs';

export default function ChatTitle() {
    const {isLoaded, chatLog} = useAppContext();
    return isLoaded ? React.createElement('div', {id: 'chat-title'}, React.createElement('h2', chatLog.title)) : null;
}