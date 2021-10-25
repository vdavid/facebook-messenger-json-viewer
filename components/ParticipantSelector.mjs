import {useAppContext} from './AppContextProvider.mjs';

export default function ParticipantSelector() {
    const {isLoaded, setMyName, myName, chatLog} = useAppContext();
    const radioElements = isLoaded ? chatLog.participantNames.map((participantName, index) =>
        ([React.createElement('input', {
            type: 'radio',
            name: 'participant',
            onClick: () => handleClick(participantName),
            id: ('radio-button-' + index),
            key: index,
            checked: myName === participantName,
        }),
            React.createElement('label', {for: 'radio-button-' + index}, participantName),
            React.createElement('br'),
        ]),
    ) : [];

    React.useEffect(() => {
        const storedMyName = loadFromLocalStorage();
        if (storedMyName) {
            setMyName(storedMyName);
        }
    }, []);

    if (isLoaded && chatLog.participantNames.length) {
        return [
            React.createElement('p', {key: -1}, 'Which participant are you?'),
            ...radioElements,
        ];
    } else {
        return null;
    }

    function handleClick(name) {
        saveToLocalStorage(name);
        setMyName(name);
    }
}

function saveToLocalStorage(myName) {
    localStorage.setItem('myName', myName);
}

function loadFromLocalStorage() {
    return localStorage.getItem('myName');
}

