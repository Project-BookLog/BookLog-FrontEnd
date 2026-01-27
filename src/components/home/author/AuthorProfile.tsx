
function AuthorProfile() {

  return (
    <div className="px-6 my-8 space-y-10">
      <section>
        <p className="text-title-02 font-semibold mb-4">기본 정보</p>

        <div className="space-y-2 text-gray-500 text-body-03">
          <div className="flex">
            <span className="w-20">학력</span>
            <span>곰 출판</span>
          </div>

          <div className="flex">
            <span className="w-20">데뷔</span>
            <span>붉은 닻(1994) </span>
          </div>

          <div className="flex">
            <span className="w-20">출생</span>
            <span>1970.11.27</span>
          </div>

          <div className="flex">
            <span className="w-20">직업</span>
            <span>소설가, 시인</span>
          </div>
        </div>
        
      </section>
    </div>
  );
}

export default AuthorProfile;
