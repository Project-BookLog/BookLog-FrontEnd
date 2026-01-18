import { useState } from "react";
import { useNavigate } from "react-router-dom"; // history.back() 대체
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { XIcon, Pencil } from "../../assets/icons";

function EditProfile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("저장한 닉네임");
  const [profileImage, setProfileImage] = useState<string | undefined>("https://picsum.photos/id/1/200/300");
  const [shelfPublic, setShelfPublic] = useState(false);
  const [logPublic, setLogPublic] = useState(false);

  const switchStyle = "relative w-[50px] h-[26px] bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-primary peer-checked:after:translate-x-[23px] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-[22px] after:w-[22px] after:border after:border-gray-300 after:transition-all peer-checked:after:border-white"
 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const clearNickname = () => {
    setNickname("");
  };

  return (
    <div className="bg-bg min-h-screen">
      <NavBarTop
        title="프로필 편집"
        onBack={() => navigate(-1)}
      />

      <main className="px-5">
        <section className="flex justify-center mt-5">
          <label className="relative w-60 h-55 rounded-[12px] cursor-pointer overflow-hidden group">
            {/* 배경 이미지 */}
            <div className="absolute inset-0 w-full h-full bg-gray-400 group-hover:bg-gray-500 transition-all duration-200">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="프로필 미리보기" 
                  className="w-full h-full object-cover" 
                />
              ) : null}
            </div>
            
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-b-op60 group-hover:bg-black/50 transition-all duration-200 flex flex-col items-center justify-center">
              <Pencil className="w-6 h-6 text-white mb-1" />
              <p className="text-body-01-m text-white text-center leading-tight">사진 수정하기</p>
            </div>
            
            {/* 파일 입력 */}
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </section>


        <section className="mt-8">
          <div className="flex justify-between border border-gray-200 rounded-[4px] px-3 py-2.5 h-[58px] items-center">
            <div className="flex-1 min-w-0">
              <p className="text-caption-02 text-gray-500 mb-1">저장한 닉네임</p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full text-subtitle-02-m outline-none bg-transparent"
                placeholder="닉네임을 입력하세요"
              />
            </div>
              <button onClick={clearNickname} className="">
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
                  aria-labelledby="shlef-visibility-switch"
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
                  aria-labelledby="booklog-visibility-switch"
                />
                <div className={switchStyle}></div>
              </label>
            </div>
          </div>

          <button className="w-full h-[53px] mt-15 bg-primary text-white py-3 px-[10px] rounded-[12px] text-subtitle-02-sb">
            저장하기
          </button>
        </section>
      </main>
    </div>
  );
}

export default EditProfile;
