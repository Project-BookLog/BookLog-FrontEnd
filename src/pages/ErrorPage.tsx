import { ErrorIcon } from "../assets/icons"

export const ErrorPage = () => {

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-6 w-full">
                <ErrorIcon className="w-[200px] h-[200px]"/>
                <div className="flex flex-col items-center gap-[10px] self-stretch">
                    <p className="text-black text-center text-[18px] font-semibold leading-[21.6px]">
                        이 페이지는 누군가 잠시 대출 중이에요.
                    </p>
                    <p className="text-[#81807F] text-center text-[13px] font-medium leading-[18.2px]">
                        경로를 다시 확인하고 있어요.<br />
                        안전한 페이지로 안내해 드릴게요.
                    </p>
                </div>
                <button
                    className="flex w-[103px] py-[12px] px-[8px] justify-center items-center gap-[10px] rounded-[50px] bg-[#3049C0] hover:bg-[#263A99] text-white text-[14px] font-medium leading-[19.6px] cursor-pointer"
                    onClick={handleRetry}
                >
                    다시 시도
                </button>
            </div>

        </div>
    )
}