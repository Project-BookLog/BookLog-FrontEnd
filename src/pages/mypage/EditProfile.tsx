import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { XIcon, Pencil, Default_ProfileImg } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";
import EditPhotoModal from "../../components/mypage/EditPhotoModal";
import {
  getMyProfile,
  updateMyProfile,
  updateMyProfileAvatar,
} from "../../api/mypage/myProfile";
import type { UpdateProfileDto } from "../../types/myPage/user.types";

function EditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [shelfPublic, setShelfPublic] = useState(false);
  const [logPublic, setLogPublic] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const { data, isError } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });

  useEffect(() => {
    if (!data) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNickname(data.nickname);
    setProfileImage(data.profileImageUrl);
    setShelfPublic(data.isShelfPublic);
    setLogPublic(data.isBooklogPublic);
  }, [data]);


  const avatarMutation = useMutation({
    mutationFn: updateMyProfileAvatar,
  });


  const profileMutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["myProfileCard"] });
      alert("프로필이 저장되었습니다!");
      navigate(-1);
    },
  });

  const handleSaveProfile = async () => {
    try {
      if (profileImageFile) {
        const avatarRes = await avatarMutation.mutateAsync(profileImageFile);
        setProfileImage(avatarRes.profileImageUrl);
        setProfileImageFile(null);
      }

      const updateData: UpdateProfileDto = {
        nickname,
        isShelfPublic: shelfPublic,
        isBooklogPublic: logPublic,
      };

      await profileMutation.mutateAsync(updateData);
    } catch {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  if (!data) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const switchStyle =
    "relative w-[50px] h-[26px] bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-primary peer-checked:after:translate-x-[23px] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-[22px] after:w-[22px] after:border after:border-gray-300 after:transition-all peer-checked:after:border-white";

  return (
    <div className="bg-bg min-h-screen">
      <NavBarTop title="프로필 편집" onBack={() => navigate(-1)} />

      <main className="px-5">
        {/* 이미지 */}
        <section className="flex justify-center mt-5 relative">
          <label className="relative w-60 h-55 rounded-[12px] cursor-pointer overflow-hidden group">
            <div className="absolute inset-0 w-full h-full bg-gray-400">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필 미리보기"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Default_ProfileImg className="w-full h-full object-cover" />
              )}
            </div>
            <div
              className="absolute inset-0 bg-b-op60 group-hover:bg-black/50 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            >
              <Pencil className="w-6 h-6 text-white mb-1" />
              <p className="text-body-01-m text-white text-center leading-tight">
                사진 수정하기
              </p>
            </div>
          </label>
        </section>

        {/* 닉네임 + 공개설정 */}
        <section className="mt-8">
          <div className="flex justify-between border border-gray-200 rounded-[4px] px-3 py-2.5 h-[58px] items-center">
            <div className="flex-1 min-w-0">
              <p className="text-caption-02 text-gray-500 mb-1">닉네임</p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full text-subtitle-02-m outline-none bg-transparent"
              />
            </div>
            <button onClick={() => setNickname("")}>
              <XIcon className="w-5 h-5 text-white rounded-full bg-gray-300" />
            </button>
          </div>

          {/* 공개/비공개 */}
          <div className="mt-8 space-y-8">
            <div className="flex justify-between items-center h-12">
              <div>
                <p className="text-subtitle-01-sb text-black">서재 공개 설정</p>
                <p className="text-body-02 text-gray-400">
                  다른 유저들에게 서재를 공개합니다
                </p>
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
                <p className="text-body-02 text-gray-400">
                  다른 유저들에게 북로그를 공개합니다
                </p>
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
            className="w-full h-[53px] mt-15 bg-primary text-white py-3 px-[10px] rounded-[12px] text-subtitle-02-sb disabled:opacity-50"
            onClick={handleSaveProfile}
            disabled={profileMutation.isPending}
          >
            {profileMutation.isPending ? "저장 중..." : "저장하기"}
          </button>
        </section>
      </main>

      <EditPhotoModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const previewUrl = URL.createObjectURL(file);
          setProfileImage(previewUrl);
          setProfileImageFile(file);
          setIsImageModalOpen(false);
        }}
      />
    </div>
  );
}

export default EditProfile;
