import { Camera, Album } from "../../assets/icons";

interface EditPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditPhotoModal({
  isOpen,
  onClose,
  onImageSelect,
}: EditPhotoModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 백드롭 */}
      <div 
        className="fixed inset-0 bg-b-op15/15 z-50 backdrop-blur-[4px]"
        onClick={onClose}
      />
      
      {/* 모달 */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-5"
        onClick={onClose}  
      >
        <div 
          className="overflow-hidden"  
          onClick={(e) => e.stopPropagation()}  
        >
          <div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <label className="flex flex-col items-center justify-center w-[132px] h-[154px] px-[10px] py-[14px] bg-white rounded-[12px] cursor-pointer">
                <Camera className="w-6 h-6 mb-[10px]" />
                <p className="text-subtitle-02-m text-gray-900">사진 촬영</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={onImageSelect}
                />
              </label>
              
              <label className="flex flex-col items-center justify-center w-[132px] h-[154px] px-[10px] py-[14px] bg-white rounded-[12px] cursor-pointer">
                <Album className="w-6 h-6 mb-[10px]" />
                <p className="text-subtitle-02-m text-gray-900">앨범에서 선택</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageSelect}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
