function BookRecommended() {

  const tagstyle = "h-9 text-gray-700 items-center px-3 py-1 rounded-full bg-gray-100 text-body-03";

  return (
    <section className="px-6 mt-6">
      <div> {/* AI 취향 코멘트 */}
        <div className="mb-3">
          <p className="text-title-02 font-semibold">AI 취향 코멘트</p>
        </div>

        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <p className="text-subtitle-01-sb mb-2">사유가 깊어지는 문장들</p>
          <p className="text-caption-01 text-gray-600">
            다정한 대화체 속에 숨겨진 서늘한 반전, 묵직한 사유가 넘는 몰입감으로 다시 읽고 싶어지는 책입니다.
          </p>
        </div>
      </div>

      <div> {/* 상세 취향 분석 */}
        <div className="mt-10">
          <p className="text-title-02 font-semibold">상세 취향 분석</p>
        </div>
        <div className="my-2 gap-2 flex flex-wrap">
          <button className={`${tagstyle} text-primary bg-lightblue-1 border-1 border-primary`}>분위기</button>
          <button className={tagstyle}>문체</button>
          <button className={tagstyle}>몰입도</button>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <p className="text-subtitle-01-sb mb-2">#몽환적인</p>
          <p className="text-caption-01 text-gray-600 mb-2">
            수채화처럼 번지는 룰루 밀러의 문장들은 초반부에 마치 한낮의 꿈을 꾸는 듯한 몽환적인 흐름을 만들어냅니다.
          </p>
          <p className="text-caption-01 text-gray-600">
            잔잔한 수면 아래 거대한 파동을 마주하는 듯, 책을 덮어도 가시지 않는 깊은 여운을 남깁니다.
          </p>
        </div>
      </div>
      

    </section>
  );
}

export default BookRecommended;
