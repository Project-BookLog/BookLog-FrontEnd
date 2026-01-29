export type UserLoginInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserLoginInformation) {
    const errors = {
        email: "",
        password: "",
    };
    

    // if (
    //     !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    //     values.email,
    //     )
    // ) {
    //     errors.email = "유효하지 않은 이메일 형식입니다.";
    // }
    if (!(values.email.length > 0)) { errors.email = "아이디는 최소 1자 이상이어야 합니다."; }
    
    if (!(values.password.length > 0)) { errors.password = "비밀번호는 최소 1자 이상이어야 합니다."; }

    return errors;
}

//로그인 유효성 검사
function validateSignin (values: UserLoginInformation) {
    return validateUser(values);
}

export { validateSignin };