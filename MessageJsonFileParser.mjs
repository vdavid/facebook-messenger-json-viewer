/**
 * @typedef {object} MessageJsonFile
 * @property {string} title
 * @property {FacebookChatParticipant[]} participants
 * @property {FacebookMessage[]} messages
 */

/**
 * @typedef {object} FacebookChatParticipant
 * @property {string} name
 */

/**
 * @typedef {object} FacebookMessage
 * @property {string} sender_name
 * @property {number} timestamp_ms
 * @property {string} content
 * @property {{uri: string}?} sticker
 * @property {{reaction: string, actor: string}[]?} reactions
 * @property {{link: string}?} share
 * @property {{uri: string, creation_timestamp: number}[]?} photos
 * @property {string} type Can be "Generic" or "Share"
 * @property {boolean} is_unsent
 */

export default class MessageJsonFileParser {
    constructor() {
        this.textDecoder = new TextDecoder();
    }

    /**
     * @param {MessageJsonFile} messageJsonFile
     * @returns {title: string, participantNames: string[], {messages: {senderName: string, timestamp: number, content: string}[]}}
     */
    parseFileContent(messageJsonFile) {
        const participants = messageJsonFile.participants.map(person => this.convertUtf8ToUtf16(person.name));
        const title = messageJsonFile.title;
        const messages = messageJsonFile.messages.reverse().map(rawMessage => ({
            senderName: this.convertUtf8ToUtf16(rawMessage.sender_name),
            timestamp: rawMessage.timestamp_ms,
            content: this.convertUtf8ToUtf16(rawMessage.content),
            type: rawMessage.type,
            isUnsent: rawMessage.is_unsent,
        }));
        return {
            title: title,
            participantNames: participants,
            messages: messages,
        };
    }

    /**
     * Source: https://stackoverflow.com/questions/52747566/what-encoding-facebook-uses-in-json-files-from-data-export
     *
     * @param {string} string
     * @returns {string}
     */
    convertUtf8ToUtf16(string) {
        let characters = string ? string.split('').map(character => character.charCodeAt(0)) : [];
        return this.textDecoder.decode(new Uint8Array(characters));
    }
}