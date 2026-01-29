// src/pages/RecordPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import PlusIcon from "../../assets/icons/plus.svg";

/** ---------- utils ---------- */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
function weekdayKo(y: number, m: number, d: number) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"] as const;
  const dow = new Date(y, m - 1, d).getDay();
  return dayNames[dow];
}
function formatKoreanDateWithWeekday(y: number, m: number, d: number) {
  return `${y}. ${m}. ${d}. ${weekdayKo(y, m, d)}요일`;
}

/** ---------- UI parts ---------- */
function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-[34px] rounded-[107.73px] px-3 py-2 transition",
        "text-en-body-02",
        active
          ? "border border-[#3049C0] bg-[#E9EBF4] text-primary"
          : "border border-transparent bg-gray-100 text-[#676665]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function PlusPill({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 w-8 rounded-full bg-gray-100 text-[#676665] grid place-items-center text-subtitle-02-m"
      aria-label="책장 추가"
    >
      <img src={PlusIcon} alt="" className="h-4 w-4 text-[#676665]" />
    </button>
  );
}

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

/** ---------- Wheel Picker (3 rows, center aligned) ---------- */
const ITEM_H = 45;
const VISIBLE_ROWS = 3;
const PADDING_ITEMS = 1;

function WheelColumn({
  values,
  value,
  onChange,
  format,
}: {
  values: number[];
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const idx = values.indexOf(value);
    if (idx < 0) return;
    const top = idx * ITEM_H;
    el.scrollTo({ top, behavior: "instant" as any });
  }, [values, value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let t: number | null = null;

    const handle = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        const raw = el.scrollTop / ITEM_H;
        const idx = Math.round(raw);
        const clamped = Math.max(0, Math.min(values.length - 1, idx));
        const targetTop = clamped * ITEM_H;
        el.scrollTo({ top: targetTop, behavior: "smooth" });
        onChange(values[clamped]);
      }, 80);
    };

    el.addEventListener("scroll", handle, { passive: true });
    return () => {
      el.removeEventListener("scroll", handle as any);
      if (t) window.clearTimeout(t);
    };
  }, [values, onChange]);

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        className="overflow-y-auto no-scrollbar scroll-smooth"
        style={{
          scrollSnapType: "y mandatory",
          height: ITEM_H * VISIBLE_ROWS,
        }}
      >
        {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
          <div key={`pt-${i}`} style={{ height: ITEM_H }} />
        ))}

        {values.map((v) => {
          const isActive = v === value;
          return (
            <div
              key={v}
              className={[
                "flex items-center justify-center",
                "text-en-title-01",
                isActive ? "text-black" : "text-[#E7E5E4]",
              ].join(" ")}
              style={{
                height: ITEM_H,
                scrollSnapAlign: "center",
              }}
            >
              {format(v)}
            </div>
          );
        })}

        {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
          <div key={`pb-${i}`} style={{ height: ITEM_H }} />
        ))}
      </div>
    </div>
  );
}

function InlineDatePicker({
  value,
  onChange,
}: {
  value: { y: number; m: number; d: number };
  onChange: (v: { y: number; m: number; d: number }) => void;
}) {
  const [y, setY] = useState(value.y);
  const [m, setM] = useState(value.m);
  const [d, setD] = useState(value.d);

  useEffect(() => {
    setY(value.y);
    setM(value.m);
    setD(value.d);
  }, [value.y, value.m, value.d]);

  useEffect(() => {
    const maxD = daysInMonth(y, m);
    if (d > maxD) setD(maxD);
  }, [y, m, d]);

  useEffect(() => {
    onChange({ y, m, d });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y, m, d]);

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    const start = 1900;
    const end = current + 1;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const days = useMemo(() => {
    const max = daysInMonth(y, m);
    return Array.from({ length: max }, (_, i) => i + 1);
  }, [y, m]);

  return (
    <div className="mt-6 px-6">
      <div className="grid grid-cols-3 gap-3 px-1">
        <WheelColumn values={years} value={y} onChange={setY} format={(v) => `${v}년`} />
        <WheelColumn values={months} value={m} onChange={setM} format={(v) => `${pad2(v)}월`} />
        <WheelColumn values={days} value={d} onChange={setD} format={(v) => `${v}일`} />
      </div>
    </div>
  );
}

/** ---------- Page ---------- */
type BookType = "종이책" | "전자책" | "오디오책";
type ReadStatus = "읽을 예정" | "읽는 중" | "완독" | "중단";

export default function RecordPage() {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  // ✅ 추가: 책종류 옵션
  const bookTypeOptions: BookType[] = ["종이책", "전자책", "오디오책"];
  const statusOptions: ReadStatus[] = ["읽을 예정", "읽는 중", "완독", "중단"];
  const shelfOptions = ["서재 1", "서재 2", "서재 3"];

  // ✅ 추가: 책종류 state
  const [bookType, setBookType] = useState<BookType | null>(null);

  const [status, setStatus] = useState<ReadStatus | null>(null);
  const [shelf, setShelf] = useState<string | null>(null);

  const today = useMemo(() => {
    const t = new Date();
    return { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() };
  }, []);

  const [date, setDate] = useState<{ y: number; m: number; d: number }>(today);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [pages, setPages] = useState<string>("");

  const isValidPages = useMemo(() => {
    if (!pages) return false;
    const n = Number(pages);
    return Number.isFinite(n) && n > 0;
  }, [pages]);

  // ✅ bookType도 있어야 적용 가능
  const canApply = Boolean(bookType && status && shelf && isValidPages);

  const dateLabel = useMemo(() => {
    return formatKoreanDateWithWeekday(date.y, date.m, date.d);
  }, [date]);

  const onApply = () => {
    if (!canApply) return;
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop title="독서 기록" onBack={() => navigate(-1)} />

      <div className="px-5 pb-28 pt-4">
        {/* ✅ 0) 책종류 */}
        <div className="mb-6">
          <div className="mb-3 text-en-subtitle-01 text-black">책종류</div>
          <div className="flex flex-wrap gap-2">
            {bookTypeOptions.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={bookType === opt}
                onClick={() => setBookType(opt)}
              />
            ))}
          </div>
        </div>

        {/* 1) 독서 상태 */}
        <div className="mb-6">
          <div className="mb-3 text-en-subtitle-01 text-black">독서 상태</div>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={status === opt}
                onClick={() => setStatus(opt)}
              />
            ))}
          </div>
        </div>

        {/* 2) 저장할 책장 */}
        <div className="mb-6">
          <div className="mb-3 text-en-subtitle-01 text-black">저장할 책장</div>
          <div className="flex flex-wrap gap-2 items-center">
            {shelfOptions.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={shelf === opt}
                onClick={() => setShelf(opt)}
              />
            ))}
            <PlusPill onClick={() => {}} />
          </div>
        </div>

        {/* 3) 읽은 날짜 */}
        <div className="mb-6">
          <div className="mb-3 text-en-subtitle-01 text-black">읽은 날짜</div>
          <button
            type="button"
            onClick={() => setDatePickerOpen((p) => !p)}
            className="h-[36px] rounded-[20px] px-4 bg-gray-100 inline-flex items-center text-en-body-01 text-black"
          >
            {dateLabel}
          </button>

          {datePickerOpen && (
            <InlineDatePicker
              value={date}
              onChange={(v) => {
                setDate(v);
              }}
            />
          )}
        </div>

        {/* 4) 읽은 페이지 수 */}
        <div className="mb-6">
          <div className="mb-3 text-en-subtitle-01 text-black">읽은 페이지 수</div>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={pages}
              onFocus={() => setDatePickerOpen(false)}
              onChange={(e) => {
                setPages(e.target.value);
              }}
              onBlur={() => {
                setPages((prev) => prev.replace(/[^\d]/g, ""));
              }}
              placeholder="오늘의 독서량을 남겨주세요."
              className={[
                "h-[41px] w-full rounded-[4px] px-4 pr-10 border bg-bg outline-none",
                "border-gray-200 text-en-subtitle-02 text-black",
                "placeholder:text-[#CDCCCB]",
                "focus:border-primary",
              ].join(" ")}
            />

            {pages.length > 0 && (
              <button
                type="button"
                onClick={() => setPages("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label="입력 지우기"
              >
                <ClearIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="mt-6 mb-3 text-en-subtitle-01 text-black">전체 페이지 수</div>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={pages}
              onFocus={() => setDatePickerOpen(false)}
              onChange={(e) => {
                setPages(e.target.value);
              }}
              onBlur={() => {
                setPages((prev) => prev.replace(/[^\d]/g, ""));
              }}
              placeholder="오늘의 독서량을 남겨주세요."
              className={[
                "h-[41px] w-full rounded-[4px] px-4 pr-10 border bg-bg outline-none",
                "border-gray-200 text-en-subtitle-02 text-black",
                "placeholder:text-[#CDCCCB]",
                "focus:border-primary",
              ].join(" ")}
            />

            {pages.length > 0 && (
              <button
                type="button"
                onClick={() => setPages("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label="입력 지우기"
              >
                <ClearIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent">
        <div className="mx-auto w-full max-w-sm px-5 pb-6">
          <button
            type="button"
            disabled={!canApply}
            onClick={onApply}
            className={[
              "h-[53px] w-full rounded-[12px] transition",
              "text-body-01-sb",
              canApply ? "bg-[#3049C0] text-white" : "bg-[#E7E5E4] text-[#81807F]",
            ].join(" ")}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
