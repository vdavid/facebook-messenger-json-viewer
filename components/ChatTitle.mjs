import {useAppContext} from './AppContextProvider.mjs';

export default function ChatTitle() {
    const {isLoaded, chatLog} = useAppContext();
    return isLoaded ? React.createElement('h2', null, chatLog.title) : null;
}