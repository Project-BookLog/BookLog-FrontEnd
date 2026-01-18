// src/pages/MyLibrary/AddLibraryPage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarTop from "../../components/NavBarTop";
import { ConfirmModal } from "../../components/modal/ConfirmModal";
import { useToast } from "../../context/ToastContext";

function ClearIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M8.6 8.6 15.4 15.4M15.4 8.6 8.6 15.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-[26px] w-[50px] items-center rounded-[100px] transition-colors",
        checked ? "bg-[#3049C0]" : "bg-[#D9D9D9]",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-[22px] w-[22px] rounded-full bg-white transition-transform",
          checked ? "translate-x-6.5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

export default function AddLibraryPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [shelfName, setShelfName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isValid = useMemo(() => shelfName.trim().length > 0, [shelfName]);

  const handleBack = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmLeave = () => {
    setIsConfirmOpen(false);
    navigate(-1);
  };

  const handleComplete = () => {
    // TODO: 실제 API 연결 시 여기서 createShelf({ name: shelfName.trim(), isPublic })

    showToast("서재가 추가되었어요.");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="mx-auto w-full max-w-[420px] bg-[#F7F5F3] pb-28">
        {/* 상단 네비 */}
        <NavBarTop title="서재 추가하기" onBack={handleBack} />

        {/* 입력 영역 */}
        <section className="px-4 pt-4">
          <div className="rounded-[4px] border border-[#E7E5E4] px-3 py-2">
            <div className="text-caption-02 text-[#9B9A97]">작성한 서재 명칭</div>

            <div className="mt-1 flex items-center gap-2">
              <input
                value={shelfName}
                onChange={(e) => setShelfName(e.target.value)}
                placeholder="서재의 명칭을 작성해 주세요."
                className="flex-1 bg-transparent text-subtitle-02-m text-[#262626] placeholder:text-[#CDCCCB] outline-none"
              />

              {shelfName.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShelfName("")}
                  aria-label="입력 지우기"
                  className="grid h-5 w-5 place-items-center"
                >
                  <ClearIcon className="h-5 w-5 text-[#8E8C89]" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 공개 설정 */}
        <section className="px-4 pt-9">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-subtitle-01-sb text-[#000000]">공개 설정</div>
              <div className="mt-2 text-body-01-m text-[#B4B3B1]">
                다른 유저들에게 서재를 공개합니다.
              </div>
            </div>

            <Switch checked={isPublic} onChange={setIsPublic} />
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2 bg-[#F7F5F3] px-4 pb-6 pt-3">
          <button
            type="button"
            disabled={!isValid}
            onClick={handleComplete}
            className={[
              "h-[53px] w-full rounded-[12px] text-subtitle-02-sb transition-colors",
              isValid
                ? "bg-[#3049C0] text-[#FFFFFF]"
                : "bg-[#E7E5E4] text-[#81807F]",
            ].join(" ")}
          >
            완료
          </button>
        </div>
      </div>

      {/* 뒤로가기 확인 모달 */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="서재 추가를 중단할까요?"
        description="중단한 내용은 복구할 수 없어요."
        confirmText="중단"
        cancelText="취소"
        onConfirm={handleConfirmLeave}
        onClose={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}
