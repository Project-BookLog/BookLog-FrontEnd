import { useState } from "react";
import { BackIcon } from "../../../assets/icons";
import type { UserBookDetail } from "../../../types";

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
              책 내용
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
