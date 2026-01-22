import { useNavigate } from "react-router-dom"
import NavBarTop from "../../components/common/navbar/NavBarTop"
import type { BookLog } from "../../types/booklog.types";
import { MyBookLogCard } from "../../components/mypage/MyBookLogCard";

export const MyBookLogPage = ({ booklogs }: {booklogs: BookLog[]}) => {

    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full bg-bg flex flex-col">
            <NavBarTop
                title="나의 북로그"
                onBack={() => navigate("/mypage")}
            />
            <div className="flex px-5 flex-col items-start gap-3 self-stretch mt-5">
                {booklogs.map((booklog) => (
                    <MyBookLogCard key={booklog.id} booklog={booklog}/>
                ))}
            </div>
        </div>
    )
}