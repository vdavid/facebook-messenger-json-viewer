/**
 * @typedef {object} RawFacebookChatLog
 * @property {string} title
 * @property {boolean} is_still_participant
 * @property {string} thread_type "RegularGroup"
 * @property {string} thread_path E.g. "inbox/inerpego_ksa5pdiv5a"
 * @property {string[]} magic_words
 * @property {{uri: string, creation_timestamp: number}} image
 * @property {RawFacebookChatParticipant[]} participants
 * @property {RawFacebookMessage[]} messages
 */

/**
 * @typedef {object} RawFacebookChatParticipant
 * @property {string} name
 */

/**
 * @typedef {object} RawFacebookMessage
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

/**
 * @typedef {object} ChatLog
 * @property {string} title
 * @property {string} threadPath
 * @property {string[]} magicWords
 * @property {string} imageUrl
 * @property {string[]} participantNames
 * @property {Message[]} messages
 */

/**
 * @typedef {object} Message
 * @property {string} senderName
 * @property {number} timestampMilliseconds
 * @property {string} content
 * @property {string?} stickerUrl
 * @property {{emoji: string, actorName: string}[]?} reactions
 * @property {string?} shareUrl
 * @property {string[]?} photoUrls
 * @property {string} type Can be "Generic" or "Share"
 * @property {boolean} isUnsent
 */

export default class FacebookChatLogParser {
    constructor() {
        this.textDecoder = new TextDecoder();
    }

    /**
     * @param {RawFacebookChatLog} rawFacebookChatLog
     * @returns {ChatLog}
     */
    parse(rawFacebookChatLog) {
        if (rawFacebookChatLog.thread_type !== 'RegularGroup') {
            console.log('New thread type found! ' + rawFacebookChatLog.thread_type);
        }
        return {
            title: this.convertUtf8ToUtf16(rawFacebookChatLog.title),
//            isStillParticipant: messageJsonFile.is_still_participant,
//            threadType: messageJsonFile.thread_type,
            threadPath: rawFacebookChatLog.thread_path,
            magicWords: rawFacebookChatLog.magic_words,
            imageUrl: rawFacebookChatLog.image ? rawFacebookChatLog.image.uri : null,
            participantNames: rawFacebookChatLog.participants.map(person => this.convertUtf8ToUtf16(person.name)),
            messages: rawFacebookChatLog.messages.reverse().map(message => ({
                senderName: this.convertUtf8ToUtf16(message.sender_name),
                timestampMilliseconds: message.timestamp_ms,
                content: this.convertUtf8ToUtf16(message.content),
                stickerUrl: (message.sticker || {}).uri,
                reactions: (message.reactions || []).map(reaction => ({emoji: reaction.reaction, actorName: reaction.actor})),
                shareUrl: (message.share || {}).link,
                photoUrls: (message.photos || []).map(photo => photo.uri),
                type: message.type,
                isUnsent: message.is_unsent,
            })),
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