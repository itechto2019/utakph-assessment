import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai"

interface Prop {
    toggle: boolean;
    data: Form.FormDataInputOption[];
    activeIndex?: number;
    handleEdit: (index: number) => void;
    onSave: (index: number, data: Form.FormDataInputOption) => void;
}
const FormItem = (prop: Prop) => {
    const { activeIndex, data, toggle, onSave, handleEdit }: Prop = prop
    const [formOptions, setFormOptions] = useState<Form.FormDataInputOption>()

    const handleEditOption = async (e: any) => {
        const { name, value }: Form.FormDataInputText = e.target
        const prop_name = name.replace('opt_', '')
        setFormOptions((prev: any) => {
            return {
                ...prev,
                [prop_name]: value
            }
        })
    }
    return data.map((opt, index) => (
        <div key={index}>
            {activeIndex !== index && !toggle && <div className="form-edit"><AiTwotoneEdit onClick={() => handleEdit(index)} /></div>}
            <div className="flex-column">
                <div className="input-wrapper">
                    <input type="text" name="opt_name" disabled={activeIndex !== index} placeholder="Name" defaultValue={opt.name} required onChange={handleEditOption} />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="opt_price" disabled={activeIndex !== index} placeholder="Price" defaultValue={opt.price} required onChange={handleEditOption} />
                </div>
            </div>
            <div className="flex-column">
                <div className="input-wrapper">
                    <input type="text" name="opt_stock" disabled={activeIndex !== index} placeholder="Stock" defaultValue={opt.stock} required onChange={handleEditOption} />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="opt_cost" disabled={activeIndex !== index} placeholder="Cost" defaultValue={opt.cost} required onChange={handleEditOption} />
                </div>
            </div>
            {activeIndex === index && toggle &&
                <div className="flex-column">
                    <div className={`action-button danger`} onClick={() => handleEdit(index)}>Cancel</div>
                    <div className={`action-button primary`} onClick={() => onSave(index, { ...opt, ...formOptions })}>Save</div>
                </div>
            }
        </div>
    ))
}
export default FormItem