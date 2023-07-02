export interface RegrexPattern {
    pattern: RegExp;
    errorMessage: string;
}

export const validationCases = {
    minLength: (minLength = 0) => {
        return {
            pattern: new RegExp(`^.{${minLength},}$`),
            errorMessage: `Please enter at least ${minLength} characters.`
        };
    },
    noSpecialCharacters: {
        pattern: /^[^^<>%$=£~|`¬*\\]*$/,
        errorMessage: 'Please do not use special characters: ^<>%$=£~|`¬ *\\.'
    },
};