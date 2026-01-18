
function CalendarCommentCard() {

  return (
    <div className="bg-bg">        
      {/* 내용 영역 */}
      <section className="w-full bg-gray-100 rounded-[12px] p-4">
        {/* subitle */}
        <div className="flex justify-between items-center">
          <div className="w-full text-subtitle-01-sb">1월의 기록, 35%의 몰입</div>
          <div className="text-caption-01 justify-center rounded-full px-3 py-1 h-[25px]">11/31</div>
        </div>

        {/* content */}
        <div className="mt-2">
          <p className="text-caption-02 text-gray-600">어느덧 1월의 잘반, 독서로 채운 11일의 기록입니다.<br />Yoon님의 독서 취향이 담긴 1월의 독서 캘린더입니다. </p>
        </div>

      </section>
    </div>
  );
}

export default CalendarCommentCard;
