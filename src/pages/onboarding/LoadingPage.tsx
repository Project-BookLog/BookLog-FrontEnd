import { Loading } from "../../assets/icons";

export const LoadingPage = () => {

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-[40px] w-full">
                <Loading className="w-[160px] h-[160px]"/>
                <div className="flex flex-col items-center gap-[10px] self-stretch">
                    <p className="text-black text-center text-[18px] font-semibold leading-[21.6px]">
                        기록이 많아 책수레가 천천히 오고 있어요
                    </p>
                    <p className="text-[#81807F] text-center text-[13px] font-medium leading-[18.2px]">
                        데이터 로딩이 다소 지연되고 있습니다.<br />
                        안전하게 불러올 때까지 조금만 대기해 주세요.
                    </p>
                </div>
                <button
                    className="flex w-[103px] py-[12px] px-[8px] justify-center items-center gap-[10px] rounded-[50px] bg-[#3049C0] active:bg-[#263A99] text-white text-[14px]  font-medium leading-[19.6px] cursor-pointer"
                    onClick={handleRetry}
                >
                    다시 시도
                </button>
            </div>

        </div>
    )
}