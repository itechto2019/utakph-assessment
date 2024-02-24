import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai"

interface Prop {
    toggle: boolean;
    data: string[];
    activeIndex?: number;
    handleEdit: (index: number) => void;
    onSave: (index: number, data: string) => void;
}
const FormItem = (prop: Prop) => {
    const { activeIndex, data, toggle, onSave, handleEdit }: Prop = prop
    const [option, setOption] = useState<string>('')

    const handleEditOption = async (e: any) => {
        const { value } = e.target
        setOption(value)
    }
    return data.map((opt, index) => (
        <div key={index}>
            {activeIndex !== index && !toggle && <div className="form-edit"><AiTwotoneEdit onClick={() => handleEdit(index)} /></div>}
            <div className="input-wrapper">
                <input type="text" disabled={activeIndex !== index} placeholder="Option" defaultValue={opt} required onChange={handleEditOption} />
            </div>
            {activeIndex === index && toggle &&
                <div className="flex-column">
                    <div className={`action-button danger`} onClick={() => handleEdit(index)}>Cancel</div>
                    <div className={`action-button primary`} onClick={() => onSave(index, option)}>Save</div>
                </div>
            }
        </div>
    ))
}
export default FormItem