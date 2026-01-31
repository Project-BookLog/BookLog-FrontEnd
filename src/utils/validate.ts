export type UserLoginInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserLoginInformation) {
    const errors = {
        email: "",
        password: "",
    };
    

    if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        values.email,
        )
    ) {
        errors.email = "이메일 형식이 올바르지 않습니다.";
    }
    
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,}$/i.test(
        values.password,
        )) { errors.password = "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 최소 1개 이상 포함해야 합니다."; }

    return errors;
}

//로그인 유효성 검사
function validateSignin (values: UserLoginInformation) {
    return validateUser(values);
}

export { validateSignin };