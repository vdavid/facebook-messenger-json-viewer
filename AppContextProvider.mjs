export const AppContext = React.createContext();
export const useAppContext = () => React.useContext(AppContext);

/**
 * @param children
 * @param {{title: string, participants: {name: string}[], messages: {senderName: string, timestamp: number, content: string}[]}} metadata
 * @returns {*}
 * @constructor
 */
export default function AppContextProvider({children}) {
    const [myName, setMyName] = React.useState(null);
    const [title, setTitle] = React.useState(null);
    const [participantNames, setParticipantNames] = React.useState([]);
    const [messages, setMessages] = React.useState([]);

    return React.createElement(AppContext.Provider, {value: {
            myName, setMyName,
            title, setTitle,
            participantNames, setParticipantNames,
            messages, setMessages,
        }}, children);
}