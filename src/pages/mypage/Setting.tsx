import NavBarTop from "../../components/common/navbar/NavBarTop";

function Setting() {
  const titleStyle = "text-caption-02 text-gray-500 mb-3.5"
  const subtitleStyle = "text-body-01-m text-gray-900 flex flex-col gap-y-4 mb-5"

  return (
    <div className="bg-bg min-h-screen">
      <NavBarTop 
        onBack={() => history.back()}
        title="설정" 
      />
      
      <main className="px-5">
        {/* 내 정보 관리 */}
        <section className="mt-5">
          <div className={titleStyle}>내 정보 관리</div>
          <div className={subtitleStyle}>
            <p>내 정보 수정</p>
            <p>독서취향 설정</p>
            <p>내 활동</p>
            <p>북마크</p>
          </div>
          <hr className="text-gray-100 mb-5" />
        </section>

        <section className="mt-5">
          <div className={titleStyle}>기타</div>
          <div className={subtitleStyle}>
            <p>공지사항</p>
            <p>자주 묻는 질문</p>
            <p>약관 및 정책/이용 동의</p>
            <p>버전 정보</p>
            <p>오픈소스 라이선스</p>
          </div>
          <hr className="text-gray-100 mb-5" />
        </section>

        <section className="mt-5">
          <div className={subtitleStyle}>
            <p>로그아웃</p>
            <p>탈퇴하기</p>
          <hr className="text-gray-100 mb-5" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Setting;
