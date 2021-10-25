export default function ChatBubble({message, myName}) {
    const classNamePostfix = myName === message.senderName ? 'right' : 'left';
    return React.createElement('div', {className: 'message-container'},
        React.createElement('div', {className: 'name-' + classNamePostfix}, message.senderName),
        React.createElement('div', {className: 'bubble-' + classNamePostfix}, message.content),
        React.createElement('span', {className: 'tooltip-' + classNamePostfix}, convertTimestampToString(message.timestampMilliseconds)),
    )
}

function convertTimestampToString(unixTimestamp) {
    const date = new Date(unixTimestamp);
    return date.toISOString().replace('T', ' ');
}