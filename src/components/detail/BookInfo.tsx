import { useState } from "react";
import { BackIcon } from "../../assets/icons";

function BookInfo() {
  const [descExpanded, setDescExpanded] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(false);

  return (
    <div className="px-6 my-8 space-y-10">
      {/* 책 소개 */}
      <section>
        <div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-title-02 font-semibold">책 소개</p>
            <button type="button" onClick={() => setDescExpanded(prev => !prev)}>
              <BackIcon
                className={`w-5 h-5 transition-transform ${
                  descExpanded ? "rotate-90" : "rotate-270"
                }`}
              />
            </button>
          </div>
          <div>
            <p
              className={
                "text-caption-01 text-gray-600 " +
                (descExpanded ? "book-desc-expanded" : "book-desc-clamp")
              }
            >
              ‘방송계의 퓰리처상’으로 불리는 피버디상(Peabody Awards)을 수상한 과학 전문기자 룰루 밀러의 경이로운 논픽션 《물고기는 존재하지 않는다》는 여러 언론 매체에서 ‘2020년 최고의 책’으로 선정할 만큼 수많은 찬사를 받은 화제의 베스트셀러다. 집착에 가까울 만큼 자연계에 질서를 부여하려 했던 19세기 어느 과학자의 삶을 흥미롭게 좇아가는 이 책은 어느 순간 독자들을 혼돈의 한복판으로 데려가서 우리가 믿고 있던 삶의 질서에 관해 한 가지 의문을 제기한다. “물고기가 존재하지 않는다는 것은 엄연한 하나의 사실이다. 그렇다면 우리는 또 무엇을 잘못 알고 있을까?” 하고 말이다. 누군가에게는 이 질문이 살아가는 데 아무런 영향을 미치지 않을 수도 있다. 하지만 세상을 바라보는 “진실한 관계들”에 한층 가까이 다가가기 위해 노력하는 사람들에게는 분명 이 책이 놀라운 영감과 어느 한쪽으로도 치우치지 않는 폭넓은 시야를 제공해줄 것이다
            </p>
          </div>
        </div>
      </section>

      {/* 목차 */}
      <section>
        <div className="mt-10">
          <div className="mb-3 flex justify-between items-center">
            <p className="text-title-02 font-semibold">목차</p>
            <button type="button" onClick={() => setTocExpanded(prev => !prev)}>
              <BackIcon
                className={`w-5 h-5 transition-transform ${
                  tocExpanded ? "rotate-90" : "rotate-270"
                }`}
              />
            </button>
          </div>
          <div>
            <p
              className={
                "text-caption-01 text-gray-600 " +
                (tocExpanded ? "book-toc-expanded" : "book-toc-clamp")
              }
            >
              프롤로그 <br /><br /> 1. 별에 머리를 담근 소년<br />2. 어느 섬의 선지자<br />3. 신이 없는 막간극<br />4. 꼬리를 좇다<br />5. 유리단지에 담긴 기원<br />6. 박살<br />7. 파괴되지 않는 것<br />8. 기만에 대하여<br />9. 세상에서 가장 쓴 것<br />10. 진정한 공포의 공간<br />11. 사다리<br />12. 민들레<br />13. 데우스 엑스 마키나<br /><br />에필로그<br />삽화에 관한 몇 마디<br />변화에 관한 몇 마디<br />감사의 말<br />주석
            </p>
          </div>
        </div>
      </section>

      {/* 기본 정보 */}
      <section>
        <p className="text-title-02 font-semibold mb-4">기본 정보</p>

        <div className="space-y-2 text-gray-500 text-body-03">
          <div className="flex">
            <span className="w-20">출판사</span>
            <span>곰 출판</span>
          </div>

          <div className="flex">
            <span className="w-20">ISBN</span>
            <span>9791189327156</span>
          </div>

          <div className="flex">
            <span className="w-20">출판 연도</span>
            <span>2021</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookInfo;
