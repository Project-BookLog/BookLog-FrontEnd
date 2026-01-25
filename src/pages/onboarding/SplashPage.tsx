import { LogoBooklog } from "../../assets/icons";
import SplashBg from "../../assets/icons/Splash.svg";

export const SplashPage = () => {
  return (
    <div
        className="relative min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${SplashBg})` }}
    >

        <div className="relative z-10 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 w-[313px] -translate-y-[13vh]">
                <LogoBooklog className="[&_*]:fill-white w-[171px] h-[45px]" />
                <div className="self-stretch">
                    <p className="text-white text-center text-[14px] font-normal leading-[19.6px]">
                        기록을 통해 취향을 발견하고, 취향을 통해 연결되는
                    </p>
                    <p className="text-white text-center text-[14px] font-bold leading-[19.6px]">
                        커뮤니티 기반 독서 플랫폼
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};
