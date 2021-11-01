import React, { useState, createContext } from 'react';

export const defaultCountOfWords = 5;
export const defaultTimeBeforeTilesHidingInSeconds = 10;
export const defaultUseOnlyUnlearnedWords = false;

export const GameContext = createContext();

export const GameProvider = props => {
    const [countOfWords, setCountOfWords] = useState(defaultCountOfWords);
    const [timeBeforeTilesHidingInSeconds, setTimeBeforeTilesHiding] = useState(defaultTimeBeforeTilesHidingInSeconds);
    const [useOnlyUnlearnedWords, setUseOnlyUnlearnedWords] = useState(defaultUseOnlyUnlearnedWords);
    const [learnedWords, setLearnedWords] = useState([]);

    var context = {
        countOfWords: countOfWords,
        timeBeforeTilesHidingInSeconds: timeBeforeTilesHidingInSeconds,
        useOnlyUnlearnedWords: useOnlyUnlearnedWords,
        learnedWords: learnedWords
    }

    const setContext = v => context = v;

    return (
        <GameContext.Provider value={[context, setContext]}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;