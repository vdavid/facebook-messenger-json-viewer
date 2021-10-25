export default class ChatBubble extends React.Component {
    /**
     * @param {{sender_name: string, timestamp_ms: number, content: string}} msg
     * @returns {*}
     */
    generateBubbles(msg) {
        if (msg.sender_name === this.props.myName) {
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
            this.props.msgs.map(msg => this.generateBubbles(msg))
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