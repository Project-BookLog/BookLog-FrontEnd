import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { validateSignin, type UserLoginInformation } from "../../utils/validate";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { KakaoTalk, LogoBooklog, SymbolLogo } from "../../assets/icons";

export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const { login, accessToken } = useAuth();

    useEffect(() => {
        if(accessToken) {
            navigate("/");
        }
    }, [navigate, accessToken]);

    const {values, errors, getInputProps} = useForm<UserLoginInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await login(values);
            if (result!) {
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.error("로그인 실패:", err);
        }
    };

    const isDisabled =
        Object.values(errors || {}).some(error => error.length > 0) ||
        Object.values(values).some(value => value === "")

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg border border-[#DEDEDE]">
            <div className="flex flex-col w-[127px] items-center gap-1">
                <SymbolLogo className="w-20 h-20"/>
                <LogoBooklog className="[&_*]:fill-primary w-[114px] h-[30px]" />
            </div>
            <div className="flex flex-col w-[335px] items-center gap-3 mt-[70px]">
                <form
                    className="flex flex-col items-start gap-4 self-stretch"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <input
                            {...getInputProps("email")}
                            className={`flex h-[56px] px-[24px] py-[15px] items-center gap-[10px] self-stretch rounded-[12px] border-none focus:outline-none focus:ring-0
                                ${!values.email ? "bg-gray-100" : "bg-white"}`}
                            type={"text"}
                            placeholder={"ID"}
                        />
                        <input
                            {...getInputProps("password")}
                            className={`flex h-[56px] px-[24px] py-[15px] items-center gap-[10px] self-stretch rounded-[12px] border-none focus:outline-none focus:ring-0
                                ${!values.password ? "bg-gray-100" : "bg-white"}`}
                            type={"password"}
                            placeholder={"PW"}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className="flex px-[10px] py-[16px] justify-center items-center gap-[10px] self-stretch rounded-[12px] bg-primary active:bg-[#263A99] disabled:bg-gray-200 text-white text-center text-[15px] font-semibold leading-[21px] cursor-pointer disabled:cursor-not-allowed"
                    >   
                        로그인
                    </button>
                    <p className="text-[14px] leading-[19.6px] font-medium text-gray-500 text-center self-stretch">
                        로그인하고 기록을 이어갈 수 있어요.
                    </p>
                </form>
            </div>
            <div className="flex flex-col w-[335px] items-center gap-6 mt-[83px]">
                <div className="flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="1" viewBox="0 0 85 1" fill="none">
                        <path d="M0 0.5H84.5893" stroke="#CDCCCB"/>
                    </svg>
                    <p className="w-[166px] text-[14px] leading-[19.6px] font-medium text-gray-500 text-center">SNS 계정으로 간편 로그인</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="1" viewBox="0 0 85 1" fill="none">
                        <path d="M0 0.5H84.5893" stroke="#CDCCCB"/>
                    </svg>
                </div>
                <div className="flex items-start gap-4">
                    <button
                        type="button"
                        className="flex w-[54px] h-[54px] py-4 justify-center items-center gap-2 rounded-[12px] bg-[#FFE812] cursor-pointer"
                    >
                        <KakaoTalk className="w-[26px] h-[26px] flex-shrink-0 aspect-square"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
