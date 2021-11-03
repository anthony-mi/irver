import verbs from './verbs';

export default function validateConfig(values) {
    let errors = {}

    if(!values.countOfWords) {
        errors.countOfWords = `Count of words is required.`;
    } else if(values.countOfWords <= 0 || values.countOfWords > verbs.length) {
        errors.countOfWords = `Count of words must be in range [1;${verbs.length}].`;
    }

    if(!values.timeBeforeTilesHidingInSeconds) {
        errors.timeBeforeTilesHidingInSeconds = `Time before tiles hiding is required.`;
    } else if(values.timeBeforeTilesHidingInSeconds <= 0 ) {
        errors.timeBeforeTilesHidingInSeconds = `Time before tiles hiding must greater than 0.`;
    }

    return errors;
}