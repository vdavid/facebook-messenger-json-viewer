import {useAppContext} from './AppContextProvider.mjs';

export default function FileSelector() {
    const {setTitle, setParticipantNames, setMessages} = useAppContext();
    return (
        React.createElement('input', {type:'file', id: 'fileupload', accept: '.json', onChange: async event => {
                const files = event.target.files;
                const cleanedData = await readJsonFile(files[0]);
                setTitle(cleanedData.title);
                setParticipantNames(cleanedData.participantNames);
                setMessages(cleanedData.messages);
            }}, null)
    );
}

function readJsonFile(file) {
    const reader = new FileReader();

    return new Promise((resolve) => { // TODO: Add error handling
        reader.addEventListener('load', (event) => {
            const fileContentAsString = event.target.result.toString();
            const fileContentAsObject = JSON.parse(fileContentAsString);
            const cleanedFileContentAsObject = cleanData(fileContentAsObject);
            resolve(cleanedFileContentAsObject);
        });

        reader.readAsText(file);
    });
}


/**
 * @param {{title: string, participants: {name: string}[], messages: [{sender_name: string, timestamp_ms: number, content: string, type: string, is_unsent: boolean}]}} raw
 * @returns {Promise<title: string, participantNames: string[], {messages: {senderName: string, timestamp: number, content: string}[]}>}
 */
function cleanData(raw) {
    const participants = raw.participants.map(person => person.name);
    const title = raw.title;
    const messages = raw.messages.reverse().map(rawMessage => ({
            senderName: rawMessage.sender_name,
            timestamp: rawMessage.timestamp_ms,
            content: rawMessage.content,
            type: rawMessage.type,
            isUnsent: rawMessage.is_unsent,
    }));
    return {
        title: title,
        participantNames: participants,
        messages: messages,
    };
}
