import {useAppContext} from './AppContextProvider.mjs';

export default function ParticipantSelector() {
    const {isLoaded, setMyName, chatLog} = useAppContext();
    const radioElements = isLoaded ? chatLog.participantNames.map((participantName, index) =>
        ([React.createElement('input', {
            type: 'radio',
            name: 'participant',
            onClick: () => radioClick(participantName),
            id: ('radio-button-' + index),
            key: index,
        }),
            React.createElement('label', {for: 'radio-button-' + index}, participantName),
            React.createElement('br'),
        ]),
    ) : [];

    React.useEffect(() => {
        isLoaded && chatLog.participantNames.length && radioClick(chatLog.participantNames[0]);
    }, [isLoaded, chatLog && chatLog.participantNames]);

    if (isLoaded && chatLog.participantNames.length) {
        return [
            React.createElement('p', {key: -1}, 'Which participant are you?'),
            ...radioElements,
        ];
    } else {
        return null;
    }

    function radioClick(name) {
        setMyName(name);
        console.log(`Setting ${name} as blue bubble`);
    }
}

