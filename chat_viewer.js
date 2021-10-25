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
    ReactDOM.render(React.createElement(ChatBubble, cleanedData.msgs), domChat);
    addChatTitle();
}

function readJSON(file) {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        console.log('JSON load sucessful');
        const msgObject = JSON.parse(event.target.result.toString());
        cleanedData = cleanData(msgObject);
        promptParticipantRadio(cleanedData.participants);
    });

    reader.readAsText(file);


}

/**
 * @param {{title: string, participants: {name: string}[], messages: [{sender_name: string, timestamp_ms: number, content: string}]}} raw
 * @returns {{msgs: [{sender_name: string, timestamp_ms: number, content: string}], title: string, participants: string[]}}
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

class ChatBubble extends React.Component {
    /**
     * @param {{sender_name: string, timestamp_ms: number, content: string}} msg
     * @returns {*}
     */
    generateBubbles(msg) {
        if (msg.sender_name === myName) {
            return (
                React.createElement(
                    'div', {className: 'message-container'},
                    React.createElement('div', {className: 'name-right'}, msg.sender_name),
                    React.createElement('div', {className: 'bubble-right'}, msg.content),
                    React.createElement('span', {className: 'tooltip-right'}, convertTimestampToString(msg.timestamp_ms)),
                )
            );
        } else {
            return (
                React.createElement(
                    'div', {className: 'message-container'},
                    React.createElement('div', {className: 'name-left'}, msg.sender_name),
                    React.createElement('div', {className: 'bubble-left'}, msg.content),
                    React.createElement('span', {className: 'tooltip-left'}, convertTimestampToString(msg.timestamp_ms)),
                )
            );
        }

    }

    render() {
        return (
            cleanedData.msgs.map(msg => this.generateBubbles(msg))
        );
    }
}

class ChatArea extends React.Component {
    render() {
        return (
            React.createElement('div', {id: 'chat-display'}, null)
        );
    }
}

function convertTimestampToString(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}