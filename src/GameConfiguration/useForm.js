import { useState, useEffect, useContext } from "react";
import { GameContext } from '../GameContext';

const useForm = () => {
    const [context, setContext] = useContext(GameContext);
    const [values, setValues] = useState({
        countOfWords: context.countOfWords,
        timeBeforeTilesHidingInSeconds: context.timeBeforeTilesHidingInSeconds,
        useOnlyUnlearnedWords: context.useOnlyUnlearnedWords
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