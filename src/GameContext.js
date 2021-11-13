import React, { useState, createContext } from 'react';

export const defaultCountOfWords = 5;
export const defaultTimeBeforeTilesHidingInSeconds = 10;
export const defaultUseOnlyUnlearnedWords = false;

export const GameContext = createContext();

export const GameProvider = props => {
    const [context, setContext] = useState({
        countOfWords: defaultCountOfWords,
        timeBeforeTilesHidingInSeconds: defaultTimeBeforeTilesHidingInSeconds,
        useOnlyUnlearnedWords: defaultUseOnlyUnlearnedWords,
        learnedWords: []
    });

    return (
        <GameContext.Provider value={[context, setContext]}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;