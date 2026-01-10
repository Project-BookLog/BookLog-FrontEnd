export type UserSigninInformation = {
    id: string;
    password: string;
};

function validateUser(values: UserSigninInformation) {
    const errors = {
        id: "",
        password: "",
    };
    

    if (!(values.id.length > 0)) { errors.id = "아이디는 최소 1자 이상이어야 합니다."; }
    
    if (!(values.password.length > 0)) { errors.password = "비밀번호는 최소 1자 이상이어야 합니다."; }

    return errors;
}

//로그인 유효성 검사
function validateSignin (values: UserSigninInformation) {
    return validateUser(values);
}

export { validateSignin };