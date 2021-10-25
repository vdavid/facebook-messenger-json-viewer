import AppContextProvider from './AppContextProvider.mjs';
import FileSelector from './FileSelector.mjs';
import ParticipantSelector from './ParticipantSelector.mjs';
import ChatTitle from './ChatTitle.mjs';
import ChatArea from './ChatArea.mjs';

export default function App() {
    return React.createElement(AppContextProvider, {}, [
            React.createElement('header', null, React.createElement('h1', null, 'Chat Display')),
            React.createElement('main', null, [
                React.createElement('section', {id: 'file-select'}, React.createElement(FileSelector)),
                React.createElement('section', {id: 'participants-radio'}, React.createElement(ParticipantSelector)),
                React.createElement('div', {id: 'chat-title'}, React.createElement(ChatTitle)),
                React.createElement('div', {id: 'chat-area'}, React.createElement(ChatArea)),
            ]),
        ],
    );
}