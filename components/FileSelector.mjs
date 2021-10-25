import {useAppContext} from './AppContextProvider.mjs';
import FacebookChatLogParser from '../FacebookChatLogParser.mjs';

const facebookChatLogParser = new FacebookChatLogParser();
export default function FileSelector() {
    const {setChatLog} = useAppContext();
    return (
        React.createElement('input', {
            type: 'file', id: 'fileupload', accept: '.json', onChange: async event => {
                const files = event.target.files;
                const parsedChatLog = await readChatLogFile(files[0]);
                setChatLog(parsedChatLog);
            },
        }, null)
    );
}

function readChatLogFile(file) {
    const reader = new FileReader();

    return new Promise((resolve) => { // TODO: Add error handling
        reader.addEventListener('load', (event) => {
            const chatLogAsJsonString = event.target.result.toString();
            const chatLogAsObject = JSON.parse(chatLogAsJsonString);
            const parsedChatLog = facebookChatLogParser.parse(chatLogAsObject);
            resolve(parsedChatLog);
        });

        reader.readAsText(file);
    });
}
