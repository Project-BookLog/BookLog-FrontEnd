
function ReadingStatus() {
  const tags = ["몽환적인", "사유적인, 묘사적인", "몰입도 높은"] as const;
  return (
    <div className="bg-bg">
      <main className="">
        
        {/* 제목 영역 */}
        <header className="mb-3.5">
          <p className="text-title-02">독서 현황</p>
        </header>

        {/* 내용 영역 */}
        <section className="w-full bg-gray-100 rounded-lg p-4">
          {/* subitle */}
          <div className="flex justify-between items-center">
            <div className="w-full text-subtitle-01-sb">이번 달 독서 현황 35%</div>
            <div className="text-caption-01 bg-white justify-center rounded-full px-3 py-1 h-[25px]">11/31</div>
          </div>

          {/* content */}
          <div className="mt-2 mb-3">
            <p className="text-caption-02 text-gray-600">몽환적인 묘사와 깊은 사유에 몰입해온 11일간의 여정.<br />Yoon님만의 선명한 문학적 취향을 완성해가고 있어요.</p>
          </div>

          {/* tag */}
          <div>
            <div className="flex flex-wrap gap-[6px]">
              {tags.map((i) => {
              return (
                <button
                  key={i}
                  className="bg-lightblue-3 text-body-03 text-primary rounded-full px-[14px] py-[5px]"
                >
                  {i}
                </button>
              );
            })}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default ReadingStatus;
