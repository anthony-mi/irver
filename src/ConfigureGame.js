import React, { useState, useContext } from 'react';
import { GameContext, defaultCountOfWords, defaultTimeBeforeTilesHidingInSeconds, defaultUseOnlyUnlearnedWords} from './GameContext';
import './verbs.js';
import verbs from './verbs.js';

const ConfigureGame = () => {
    const [countOfWords, setCountOfWords] = useState(defaultCountOfWords);
    const [timeBeforeTilesHidingInSeconds, setTimeBeforeTilesHiding] = useState(defaultTimeBeforeTilesHidingInSeconds);
    const [useOnlyUnlearnedWords, setUseOnlyUnlearnedWords] = useState(defaultUseOnlyUnlearnedWords);

    const [validationErrors, setValidationErrors] = useState([]);

    const [_, setGameConfig] = useContext(GameContext);

    const updateCountOfWords = (e) => {
        const count = e.target.value;

        if(count < 1 || count > verbs.length) {
            
        }
        else {
            setCountOfWords(e.target.value);
        }
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
        <form class='card col-md-7 mt-5 p-3' onSubmit={runGame}>
            <label class="form-label">
                Count of words:
                <input type="number" class="form-control" name="countOfWords" value={countOfWords} onChange={updateCountOfWords} required min='5' max={verbs.length} />
            </label>
            <br />
            <label>
                Time before tiles hiding (in seconds):
                <input type="number" class="form-control" name="timeBeforeTilesHidingInSeconds" value={timeBeforeTilesHidingInSeconds} onChange={updateTime} required />
            </label>
            <br />
            <div class="mt-2 d-flex">
                <h6 class="mb-0">Use only unlearned words</h6>
                <div class="form-check form-switch ps-0 ms-auto my-auto">
                    <input class="form-check-input mt-1 ms-auto" type="checkbox" name="useOnlyUnlearnedWords" value={useOnlyUnlearnedWords} onChange={updateUseUnlearned} />
                </div>
            </div>
            <br />
            <button class='btn bg-gradient-dark px-3 mb-2 active'>Submit</button>
        </form>
    );
}

export default ConfigureGame;