import {useAppContext} from './AppContextProvider.mjs';

export default function ChatTitle() {
    const {title} = useAppContext();
    return React.createElement('div', {id: 'chat-title'}, React.createElement('h2', title));
}