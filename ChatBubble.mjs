export default function ChatBubble({messages, myName}) {
    return (
        messages.map(message => generateBubbles(message, myName))
    );
}

/**
 * @param {{sender_name: string, timestamp_ms: number, content: string}} message
 * @param {string} myName
 * @returns {*}
 */
function generateBubbles(message, myName) {
    if (message.sender_name === myName) {
        return (
            React.createElement(
                'div', {className: 'message-container'},
                React.createElement('div', {className: 'name-right'}, message.sender_name),
                React.createElement('div', {className: 'bubble-right'}, message.content),
                React.createElement('span', {className: 'tooltip-right'}, convertTimestampToString(message.timestamp_ms)),
            )
        );
    } else {
        return (
            React.createElement(
                'div', {className: 'message-container'},
                React.createElement('div', {className: 'name-left'}, message.sender_name),
                React.createElement('div', {className: 'bubble-left'}, message.content),
                React.createElement('span', {className: 'tooltip-left'}, convertTimestampToString(message.timestamp_ms)),
            )
        );
    }

}

function convertTimestampToString(unixTimestamp) {
    const date = new Date(unixTimestamp);
    return date.toISOString().replace('T', ' ');
}