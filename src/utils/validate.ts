export type UserSigninInformation = {
    id: string;
    password: string;
};

function validateUser(values: UserSigninInformation) {
    const errors = {
        id: "",
        password: "",
    };
    

    if (!(values.id.length > 0))
    
    if (!(values.password.length > 0))

    return errors;
}

//로그인 유효성 검사
function validateSignin (values: UserSigninInformation) {
    return validateUser(values);
}

export { validateSignin };