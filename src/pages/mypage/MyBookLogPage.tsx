import { useNavigate } from "react-router-dom"
import NavBarTop from "../../components/common/navbar/NavBarTop"
import { MyBookLogCard } from "../../components/mypage/MyBookLogCard";
import { BOOKLOGS } from "../../data/booklog.mock";

export const MyBookLogPage = () => {

    const navigate = useNavigate();
    
    const booklogs = BOOKLOGS;

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