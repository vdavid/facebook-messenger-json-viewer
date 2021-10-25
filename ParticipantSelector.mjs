import {useAppContext} from './AppContextProvider.mjs';

export default function ParticipantSelector() {
    const {setMyName, participantNames} = useAppContext();
    const radioElements = participantNames.map((participantName, index) =>
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
    );

    React.useEffect(() => {
        participantNames.length && radioClick(participantNames[0]);
    }, [participantNames]);

    if(participantNames.length) {
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

