import React, { useState, useContext } from 'react';
import { GameContext, defaultCountOfWords, defaultTimeBeforeTilesHidingInSeconds, defaultUseOnlyUnlearnedWords} from './GameContext';
import './verbs.js';
import verbs from './verbs.js';

const ConfigureGame = () => {
    const [countOfWords, setCountOfWords] = useState(defaultCountOfWords);
    const [timeBeforeTilesHidingInSeconds, setTimeBeforeTilesHiding] = useState(defaultTimeBeforeTilesHidingInSeconds);
    const [useOnlyUnlearnedWords, setUseOnlyUnlearnedWords] = useState(defaultUseOnlyUnlearnedWords);
    const [_, setGameConfig] = useContext(GameContext);

    const updateCountOfWords = (e) => {
        setCountOfWords(e.target.value);
    }

    const updateTime = (e) => {
        setTimeBeforeTilesHiding(e.target.value);
    }

    const updateUseUnlearned = (e) => {
        setUseOnlyUnlearnedWords(e.target.value);
    }

    const runGame = (e) => {
        e.preventDefault();
        setGameConfig(prevConfig => {
            const newContextState = {
                countOfWords: countOfWords,
                timeBeforeTilesHidingInSeconds: timeBeforeTilesHidingInSeconds,
                useOnlyUnlearnedWords: useOnlyUnlearnedWords,
                learnedWords: prevConfig.learnedWords
            };
            return newContextState;
        });
    }

    return(
        <form onSubmit={runGame}>
            <label>
                Count of words:
                <input type="number" name="countOfWords" value={countOfWords} onChange={updateCountOfWords} required min='5' max={verbs.length} />
            </label>
            <label>
                Time before tiles hiding (in seconds):
                <input type="number" name="timeBeforeTilesHidingInSeconds" value={timeBeforeTilesHidingInSeconds} onChange={updateTime} required />
            </label>
            <label>
                Use only unlearned words
                <input type="checkbox" name="useOnlyUnlearnedWords" value={useOnlyUnlearnedWords} onChange={updateUseUnlearned} />
            </label>
            <button>Submit</button>
        </form>
    );
}

export default ConfigureGame;