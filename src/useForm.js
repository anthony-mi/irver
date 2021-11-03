import { useState, useEffect } from "react";
import { defaultCountOfWords, defaultTimeBeforeTilesHidingInSeconds, defaultUseOnlyUnlearnedWords} from './GameContext';

const useForm = () => {
    const [values, setValues] = useState({
        countOfWords: defaultCountOfWords,
        timeBeforeTilesHidingInSeconds: defaultTimeBeforeTilesHidingInSeconds,
        useOnlyUnlearnedWords: defaultUseOnlyUnlearnedWords
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    return { handleChange, values };
}

export default useForm;