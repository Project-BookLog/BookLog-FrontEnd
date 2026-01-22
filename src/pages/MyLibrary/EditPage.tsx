// src/pages/MyLibrary/EditPage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { ConfirmModal } from "../../components/common/ConfirmModal";
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

export default function EditPage() {
  const navigate = useNavigate();
  const { showToast } = useToast(); // ✅ 추가

  const [shelfName, setShelfName] = useState("입력되어있던 서재 명칭 텍스트");
  const [isPublic, setIsPublic] = useState(true);

  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const isValid = useMemo(() => shelfName.trim().length > 0, [shelfName]);

  const handleBack = () => {
    setIsExitConfirmOpen(true);
  };

  const handleConfirmExit = () => {
    setIsExitConfirmOpen(false);
    navigate(-1);
  };

  const handleDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteConfirmOpen(false);
    // TODO: API 연결 시 여기서 delete 요청
    // deleteShelf(...)
    navigate(-1);
  };

  const handleApply = () => {
    // TODO: API 연결 시 여기서 update 요청
    // updateShelf({ name: shelfName.trim(), isPublic })

    showToast("서재 편집이 완료되었어요."); // ✅ 토스트
    navigate(-1); // ✅ 이전 화면
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto w-full max-w-[420px] bg-bg pb-32">
        <NavBarTop title="서재 편집하기" onBack={handleBack} />

        <section className="px-4 pt-4">
          <div className="rounded-[4px] border border-[#E7E5E4] bg-[#F2F0EE] px-3 py-2">
            <div className="text-caption-02 text-[#9B9A97]">작성한 서재 명칭</div>

            <div className="mt-1 flex items-center gap-2">
              <input
                value={shelfName}
                onChange={(e) => setShelfName(e.target.value)}
                placeholder="서재의 명칭을 작성해 주세요."
                className="flex-1 bg-transparent text-subtitle-02-sb text-[#262626] placeholder:text-[#CDCCCB] outline-none"
              />

              {shelfName.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShelfName("")}
                  aria-label="입력 지우기"
                  className="grid h-6 w-6 place-items-center"
                >
                  <ClearIcon className="h-6 w-6 text-[#8E8C89]" />
                </button>
              )}
            </div>
          </div>
        </section>

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
      </div>

      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2 bg-bg px-4 pb-6 pt-3">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="h-[53px] flex-1 rounded-[12px] bg-[#E7E5E4] text-subtitle-02-sb text-[#FF6E73]"
          >
            삭제
          </button>

          <button
            type="button"
            disabled={!isValid}
            onClick={handleApply}
            className={[
              "h-[53px] flex-1 rounded-[12px] text-subtitle-02-sb transition-colors",
              isValid
                ? "bg-[#3049C0] text-[#FFFFFF]"
                : "bg-[#E7E5E4] text-[#81807F]",
            ].join(" ")}
          >
            적용
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isExitConfirmOpen}
        title="서재 편집을 중단할까요?"
        description="중단한 내용은 복구할 수 없어요."
        confirmText="중단"
        cancelText="취소"
        onConfirm={handleConfirmExit}
        onClose={() => setIsExitConfirmOpen(false)}
      />

      <ConfirmModal
        isOpen={isDeleteConfirmOpen}
        title="서재를 삭제할까요?"
        description="삭제한 서재는 복구할 수 없어요."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteConfirmOpen(false)}
      />
    </div>
  );
}
