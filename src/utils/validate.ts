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
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i.test(
        values.email,
        )
    ) {
        errors.email = "올바른 이메일 형식을 입력해주세요.";
    }
    
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,}$/i.test(
        values.password,
        )) { errors.password = "비밀번호는 영문, 숫자, 특수문자 각 1자 이상을 포함하여 8자 이상 입력해주세요."; }

    return errors;
}

//로그인 유효성 검사
function validateSignin (values: UserLoginInformation) {
    return validateUser(values);
}

export { validateSignin };