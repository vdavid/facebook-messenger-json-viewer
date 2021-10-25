export default function ChatBubble({message, myName}) {
    const classNamePostfix = myName === message.senderName ? 'mine' : '';
    return React.createElement('div', {className: 'message ' + classNamePostfix},
        React.createElement('div', {className: 'name'}, `${message.senderName} (${convertTimestampToString(message.timestampMilliseconds)})`),
        React.createElement('div', {className: 'bubble'}, formatContent(message)),
        React.createElement('div', {className: 'reactions'}, message.reactions.map(
            reaction => React.createElement('div', {className: 'reaction'}, [reaction.emoji, React.createElement('div', {className: 'reaction-tooltip'}, reaction.actorName)]))),
    )
}

function convertTimestampToString(unixTimestamp) {
    const date = new Date(unixTimestamp);
    return date.toISOString().replace('T', ' ').replace(/\.\d\d\d/, '');
}

function formatContent(message) {
    // TODO: Find a way to reliably show photos
    return message.content
        ? message.content
        : (message.photoUrls
            ? '{photos}' // message.photoUrls.map(photoUrl => React.createElement('img', {src: `/facebook-messenger-json-viewer/data/${photoUrl}`}))
            : '{unknown}');
    //
}