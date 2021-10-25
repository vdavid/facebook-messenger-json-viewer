import ChatBubble from './ChatBubble.mjs';
import ChatArea from './ChatArea.mjs';

let myName;
let cleanedData;

const fileSelector = document.getElementById('fileupload');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
    readJSON(fileList[0]);
});

const domButton = document.querySelector('#submit-button');
ReactDOM.render(
    React.createElement('button', {onClick: () => handleSubmit()}, 'Submit'),
    domButton,
);


function handleSubmit() {
    ReactDOM.render(React.createElement(ChatArea), document.querySelector('#chat-area'));
    const domChat = document.querySelector('#chat-display');
    ReactDOM.render(React.createElement(ChatBubble, {msgs: cleanedData.msgs, myName}), domChat);
    addChatTitle();
}

function readJSON(file) {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        console.log('JSON load successful');
        const msgObject = JSON.parse(event.target.result.toString());
        cleanedData = cleanData(msgObject);
        promptParticipantRadio(cleanedData.participants);
    });

    reader.readAsText(file);


}

/**
 * @param {{title: string, participants: {name: string}[], messages: [{sender_name: string, timestamp_ms: number, content: string}]}} raw
 * @returns {{msgs: {sender_name: string, timestamp_ms: number, content: string}[], title: string, participants: string[]}}
 */
function cleanData(raw) {
    const participants = raw.participants.map(person => person.name);
    const title = raw.title;
    const msgs = raw.messages.reverse();
    return {
        'participants': participants,
        'title': title,
        'msgs': msgs,
    };
}

function addChatTitle() {
    const chatTitle = document.querySelector('#chat-title');
    ReactDOM.render(React.createElement('h2', {}, cleanedData.title), chatTitle);
}

function promptParticipantRadio(participants) {
    const participantsRadio = document.querySelector('#participants-radio');
    const radioElements = [];

    radioElements.push(React.createElement('p', {}, 'Which participant are you?'));

    participants.forEach(function (n, i) {
        radioElements.push(
            React.createElement('input', {
                type: 'radio',
                name: 'participant',
                onClick: () => radioClick(n),
                id: ('radio-button-' + i),
            }),
        );
        radioElements.push(
            React.createElement('label', {onClick: () => document.getElementById('radio-button-' + i).click()}, n),
        );
        radioElements.push(React.createElement('br'));
    });
    ReactDOM.render(radioElements,
        participantsRadio);

    document.querySelector('#radio-button-0').click();

}

function radioClick(name) {
    myName = name;
    console.log(`Setting ${name} as blue bubble`);
}



