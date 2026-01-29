import { ThickCheckIcon } from "../../assets/icons"

export const EditCheckBox = ({ checked }: { checked: boolean}) => {
    return (
        <div className={`flex w-5 h-5 p-[6px] justify-center items-center gap-[10px] rounded-[4px] ${checked ? "bg-primary" : "border border-b-op40"}`}>
            {checked && <ThickCheckIcon/>}
        </div>
    )
}