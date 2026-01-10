import { Toast } from "../components/toast/Toast";
import { useToast } from "../hooks/useToast";

export const TestPage = () => {
    const { message, showToast } = useToast();

const handleSave = () => {
  showToast("북로그가 임시 저장되었어요.");
};

return (
  <>
    <button onClick={handleSave}>저장</button>
    {message && <Toast message={message} />}
  </>
);
}