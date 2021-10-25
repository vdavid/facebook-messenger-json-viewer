import {useAppContext} from './AppContextProvider.mjs';
import MessageJsonFileParser from '../MessageJsonFileParser.mjs';

const messageJsonFileParser = new MessageJsonFileParser();
export default function FileSelector() {
    const {setTitle, setParticipantNames, setMessages} = useAppContext();
    return (
        React.createElement('input', {
            type: 'file', id: 'fileupload', accept: '.json', onChange: async event => {
                const files = event.target.files;
                const cleanedData = await readJsonFile(files[0]);
                setTitle(cleanedData.title);
                setParticipantNames(cleanedData.participantNames);
                setMessages(cleanedData.messages);
            },
        }, null)
    );
}

function readJsonFile(file) {
    const reader = new FileReader();

    return new Promise((resolve) => { // TODO: Add error handling
        reader.addEventListener('load', (event) => {
            const fileContentAsString = event.target.result.toString();
            const fileContentAsObject = JSON.parse(fileContentAsString);
            const cleanedFileContentAsObject = messageJsonFileParser.parseFileContent(fileContentAsObject);
            resolve(cleanedFileContentAsObject);
        });

        reader.readAsText(file);
    });
}
