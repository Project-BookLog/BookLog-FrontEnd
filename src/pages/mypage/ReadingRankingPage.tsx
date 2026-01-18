
import NavBarTop from "../../components/common/navbar/NavBarTop";
import TopReadingRanking from "../../components/mypage/TopReadingRanking";
import ReadingRankingList from "../../components/mypage/ReadingRankingList";
function ReadingRankingPage() {
  return (
    <div className="bg-bg min-h-screen">
      <NavBarTop 
        title="독서 랭킹"
        onBack={() => history.back()}
      />

      <main className="px-5 pt-5 pb-8">
        
        <TopReadingRanking />
        <hr className="text-gray-100 mt-5"/>

        <ReadingRankingList />

      </main>
    </div>
  );
}

export default ReadingRankingPage;
