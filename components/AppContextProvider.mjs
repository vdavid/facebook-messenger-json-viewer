export const AppContext = React.createContext();
/**
 * @returns {{myName: string, setMyName: (string) => void, chatLog: ChatLog, setChatLog: (ChatLog) => void}}
 */
export const useAppContext = () => React.useContext(AppContext);

/**
 * @param children
 * @param {{title: string, participants: {name: string}[], messages: {senderName: string, timestamp: number, content: string}[]}} metadata
 * @returns {*}
 * @constructor
 */
export default function AppContextProvider({children}) {
    const [myName, setMyName] = React.useState(null);
    const [chatLog, setChatLog] = React.useState(null);

    return React.createElement(AppContext.Provider, {value: {
            myName, setMyName,
            chatLog, setChatLog,
            isLoaded: !!chatLog
        }}, children);
}