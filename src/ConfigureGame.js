import React, { useState, useContext } from 'react';
import { GameContext, defaultCountOfWords, defaultTimeBeforeTilesHidingInSeconds, defaultUseOnlyUnlearnedWords} from './GameContext';
import verbs from './verbs.js';
import useForm from './useForm';
import validate from './validateConfig';

const ConfigureGame = () => {
    const {handleChange, values} = useForm();
    const [_, setGameConfig] = useContext(GameContext);
    const [errors, setErrors] = useState({});
    // Whether the validation process was completed.
    // The value of true doesn't mean that the data of the form is valid.
    const [wasValidated, setWasValidated] = useState(false);

    const runGame = (e) => {
        e.preventDefault();

        setErrors(validate(values));
        setWasValidated(true);
        setGameConfig(prevConfig => {
            const newContextState = {
                countOfWords: values.countOfWords,
                timeBeforeTilesHidingInSeconds: values.timeBeforeTilesHidingInSeconds,
                useOnlyUnlearnedWords: values.useOnlyUnlearnedWords,
                learnedWords: prevConfig.learnedWords
            };
            return newContextState;
        });
    }

    return(
        <form className={`card col-md-7 mt-5 p-3 needs-validation`} onSubmit={runGame}>
            {/* ${isFormValid ? 'was-validated' : ''} */}
            <label className="form-label">
                Count of words:
                <input type="number"
                       className={`form-control ${wasValidated ? errors.countOfWords ? 'is-invalid' : 'is-valid' : ''}`}
                       name="countOfWords" value={values.countOfWords} onChange={handleChange} required min='5' max={verbs.length} />
                {errors.countOfWords && <div className="invalid-feedback">{errors.countOfWords}</div>}
            </label>
            <br />
            <label>
                Time before tiles hiding (in seconds):
                <input type="number"
                       className={`form-control ${wasValidated ? errors.timeBeforeTilesHidingInSeconds ? 'is-invalid' : 'is-valid' : ''}`}
                       name="timeBeforeTilesHidingInSeconds" value={values.timeBeforeTilesHidingInSeconds} onChange={handleChange} required />
                {errors.timeBeforeTilesHidingInSeconds && <div className="invalid-feedback">{errors.timeBeforeTilesHidingInSeconds}</div>}
            </label>
            <br />
            <div className="mt-2 d-flex">
                <h6 className="mb-0">Use only unlearned words</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                    <input className="form-check-input mt-1 ms-auto" type="checkbox" name="useOnlyUnlearnedWords" value={values.useOnlyUnlearnedWords} onChange={handleChange} />
                </div>
            </div>
            <br />
            <button className='btn bg-gradient-dark px-3 mb-2 active'>Submit</button>
        </form>
    );
}

export default ConfigureGame;
