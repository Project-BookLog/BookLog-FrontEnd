import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";
import EditPhotoModal from "../../components/mypage/EditPhotoModal";
import { XIcon, Pencil } from "../../assets/icons";
import { getMyProfile, updateMyProfile } from "../../api/myProfile";
import type { UpdateProfileDto } from "../../types/user.types";

function EditProfile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [shelfPublic, setShelfPublic] = useState(false);
  const [logPublic, setLogPublic] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getMyProfile();
        // console.log(" 불러온 프로필 데이터:", data);

        setNickname(data.nickname);
        setProfileImage(data.profileImageUrl || undefined);
        setShelfPublic(data.isShelfPublic);
        setLogPublic(data.isBooklogPublic);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error("프로필 정보 불러오기 실패:", error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const openImageModal = () => setIsImageModalOpen(true);

  const switchStyle = "relative w-[50px] h-[26px] bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-primary peer-checked:after:translate-x-[23px] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-[22px] after:w-[22px] after:border after:border-gray-300 after:transition-all peer-checked:after:border-white";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (profileImage?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
    setIsImageModalOpen(false);
  };

  const clearNickname = () => {
    setNickname("");
  };


  const handleSaveProfile = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const updateData: UpdateProfileDto = {
        nickname,
        isShelfPublic: shelfPublic,
        isBooklogPublic: logPublic,
      };

      // console.log("저장할 데이터:", updateData);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedData = await updateMyProfile(updateData);
      // console.log("업데이트 완료:", updatedData);

      alert("프로필이 저장되었습니다!");
      navigate(-1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error(" 저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingPage />;
  if (loadError) return <ErrorPage />

  return (
    <div className="bg-bg min-h-screen">
      <NavBarTop
        title="프로필 편집"
        onBack={() => navigate(-1)}
      />

      <main className="px-5">
        <section className="flex justify-center mt-5 relative">
          <label className="relative w-60 h-55 rounded-[12px] cursor-pointer overflow-hidden group">
            <div className="absolute inset-0 w-full h-full bg-gray-400">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="프로필 미리보기" 
                  className="w-full h-full object-cover" 
                />
              ) : null}
            </div>
            <div 
              className="absolute inset-0 bg-b-op60 group-hover:bg-black/50 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer"
              onClick={openImageModal}
            >
              <Pencil className="w-6 h-6 text-white mb-1" />
              <p className="text-body-01-m text-white text-center leading-tight">사진 수정하기</p>
            </div>
          </label>
        </section>

        <section className="mt-8">
          <div className="flex justify-between border border-gray-200 rounded-[4px] px-3 py-2.5 h-[58px] items-center">
            <div className="flex-1 min-w-0">
              <p className="text-caption-02 text-gray-500 mb-1">닉네임</p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full text-subtitle-02-m outline-none bg-transparent"
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <button onClick={clearNickname}>
              <XIcon className="w-5 h-5 text-white rounded-full bg-gray-300" />
            </button>
          </div>

          <div className="mt-8 space-y-8">
            <div className="flex justify-between items-center h-12">
              <div>
                <p className="text-subtitle-01-sb text-black">서재 공개 설정</p>
                <p className="text-body-02 text-gray-400">다른 유저들에게 서재를 공개합니다</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={shelfPublic}
                  onChange={(e) => setShelfPublic(e.target.checked)}
                />
                <div className={switchStyle}></div>
              </label>
            </div>

            <div className="flex justify-between items-center h-12">
              <div>
                <p className="text-subtitle-01-sb text-black">북로그 공개 설정</p>
                <p className="text-body-02 text-gray-400">다른 유저들에게 북로그를 공개합니다</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={logPublic}
                  onChange={(e) => setLogPublic(e.target.checked)}
                />
                <div className={switchStyle}></div>
              </label>
            </div>
          </div>

          <button 
            className="w-full h-[53px] mt-15 bg-primary text-white py-3 px-[10px] rounded-[12px] text-subtitle-02-sb disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSaveProfile}
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "저장하기"}
          </button>
        </section>
      </main>

      <EditPhotoModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageChange}
      />
    </div>
  );
}

export default EditProfile;
