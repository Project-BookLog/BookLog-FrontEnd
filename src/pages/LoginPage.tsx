import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Booklog, KakaoTalk } from "../assets/icons";

export const LoginPage = () => {
    const navigate = useNavigate();

    const { login, id } = useAuth();

    useEffect(() => {
        if (id) {
           navigate("/"); 
        }
    }, [navigate, id]);

    const {values, errors, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            id: "",
            password: "",
        },
        validate: validateSignin
    });

    const handleSubmit = async () => {
        await login(values);
    };

    const isDisabled =
    Object.values(errors || {}).some(error => error.length > 0) ||
    Object.values(values).some(value => value === "")

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-15">
            <div className="flex flex-col w-[127px] items-center gap-[18px]">
                <img className="flex flex-col w-[85.874px] h-[88.231px] px-[30px] py-[34px] items-center justify-center gap-[10px] bg-[#D9D9D9]"/>
                <Booklog className="[&_*]:fill-primary w-[127px] h-[50px]" />
            </div>
            <div className="flex flex-col w-[335px] items-center gap-3">
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <input
                            {...getInputProps("id")}
                            className={`flex h-[56px] px-[24px] py-[15px] items-center gap-[10px] self-stretch rounded-[12px] border-none focus:outline-none focus:ring-0
                                ${!values.id ? "bg-gray-100" : "bg-white"}`}
                            type={"id"}
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
                        type="button"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className="flex px-[10px] py-[16px] justify-center items-center gap-[10px] self-stretch rounded-[12px] bg-primary hover:bg-[#263A99] disabled:bg-gray-200 text-white text-center text-[15px] font-semibold leading-[21px] cursor-pointer disabled:cursor-not-allowed"
                    >   
                        로그인
                    </button>
                    <p className="text-[14px] leading-[19.6px] font-medium text-gray-500 text-center self-stretch">
                        로그인하고 기록을 이어갈 수 있어요.
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-[335px] items-center gap-6">
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