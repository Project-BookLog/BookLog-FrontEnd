import { useEffect, useRef } from "react";
import { ArrowRight, Vector } from "../../assets/icons";

export type LibraryAction = {
  label: string;
  onClick: () => void;
  visible?: boolean;
};

type ActionDropDownProps = {
  actions: LibraryAction[];
  onClose: () => void;
};

export const LibraryActionDropDown = ({actions, onClose}: ActionDropDownProps) => {

    const visibleActions = actions.filter(
        (action) => action.visible !== false
    );

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={ref}
            className="absolute top-full right-4 mt-3 z-50 flex w-[154px] px-5 py-2 flex-col items-center gap-[2px] rounded-[12px] bg-white"
        >
            {visibleActions.map((action, index) => (
                <div key={action.label} className="w-full flex flex-col">
                    <button
                        className="flex py-2 justify-between items-center self-stretch cursor-pointer"
                        onClick={() => {
                            action.onClick();
                            onClose();
                        }}
                    >
                        <p className="text-gray-900 text-subtitle-02-m">{action.label}</p>
                        <ArrowRight className="w-[14px] h-[14px]"/>
                    </button>
                    {index !== visibleActions.length - 1 && (
                        <div className="h-0 self-stretch stroke-[1px] stroke-gray-200">
                            <Vector/>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
    
}