import { useState } from "react";
import validator from "../../helpers/validations/Validators";
import AlertMessage from "../alerts/AlertMessage";
import ProductApi from "../../api/ProductsApi";
import FormItem from "./FormItem";
interface Prop {
    onSubmit: (arg: boolean) => void;
    toggle: boolean;
    title: string;
}

const ModalCreate = ({ title, toggle, onSubmit }: Prop) => {

    const [info, setAlert] = useState<Form.ErrorInterface | undefined>()
    const [toggleOption, setToggleOption] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>()
    const [toggleOptionEditor, setToggleOptionEditor] = useState<boolean>(false)
    const [option, setOption] = useState<string>('')
    const [formData, setFormData] = useState<Form.FormInput>({
        name: '',
        category: '',
        cost: '',
        price: '',
        stock: '',
        options: []
    })
    const handleInput = async (e: any) => {
        const { name, value }: Form.FormDataInputText = e.target
        setFormData((prev: any) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSave = async (e: any) => {
        e.preventDefault()
        const data: Form.FormInputArgs = {
            name: formData?.name,
            category: formData?.category,
            cost: parseFloat(formData?.cost),
            price: parseFloat(formData?.price),
            stock: parseInt(formData?.stock),
            options: formData?.options
        }
        const error = await validator.validateProductForm(data)
        if (error) {
            setAlert({
                messages: error.messages,
                type: error.type
            })
            return
        }
        setAlert(undefined)
        const result = await ProductApi.createProduct(data)
        setAlert({
            messages: result.messages,
            type: result.type
        })
        handleClose()
    }
    const handleClose = () => {
        onSubmit(false)
        setAlert(undefined)
    }
    const handleOptionInput = (e: any) => {
        const { value } = e.target
        setOption(value)
    }
    const handleSaveOption = async () => {
        const error = await validator.validateOption(option)
        if (error) {
            setAlert((prev: any) => {
                return {
                    ...prev,
                    messages: error.messages,
                    type: error.type
                }
            })
            return
        }
        setFormData((prev: any) => {
            return {
                ...prev,
                options: [...prev.options, option]
            }
        })
        setToggleOption(!toggleOption)
        setAlert(undefined)
    }

    const handleToggleMode = (index: number) => {
        setToggleOptionEditor(!toggleOptionEditor)
        if (index === activeIndex) {
            setActiveIndex(undefined)
            return
        }
        setActiveIndex(index)
    }

    const handleEditSave = async (index: number, item: string) => {
        if (!formData.options) return
        const updated = formData.options
        updated[index] = item

        const error = await validator.validateOption(item)
        if (error) {
            setAlert(error)
            return
        }
        setFormData((prev: any) => {
            return {
                ...prev,
                options: updated
            }
        })
        setActiveIndex(undefined)
        setToggleOptionEditor(!toggleOptionEditor)
        setAlert(undefined)
    }
    const handleToggleOption = () => {
        setToggleOption(!toggleOption)
    }
    return toggle && <div className="modal-overlay">
        <div className="modal">
            <div className="modal-form">
                <div className="modal-header">
                    <div className="modal-title">Create Form</div>
                </div>
                <div className="modal-body">
                    <div className="modal_subtitle">{title}</div>
                    <AlertMessage
                        messages={info?.messages}
                        type={info?.type}
                    />
                    <form className="modal-form">
                        <div className="flex-column">
                            <div className="input-wrapper">
                                <input type="text" name="name" placeholder="Name" defaultValue={formData.name} required onChange={handleInput} />
                            </div>
                            <div className="input-wrapper">
                                <input type="text" name="category" placeholder="Category" defaultValue={formData.category} required onChange={handleInput} />
                            </div>
                        </div>
                        <div className="flex-column">
                            <div className="input-wrapper">
                                <input type="text" name="price" inputMode="decimal" placeholder="Price" defaultValue={formData.price} required onChange={handleInput} />
                            </div>
                            <div className="input-wrapper">
                                <input type="text" inputMode="decimal" name="cost" placeholder="Cost" defaultValue={formData.cost} required onChange={handleInput} />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <input type="text" name="stock" placeholder="Stock" defaultValue={formData.stock} required onChange={handleInput} />
                        </div>
                        <div className="form-subtitle">Items</div>
                        {
                            !toggleOption && formData?.options && formData?.options?.length > 0 &&
                            <FormItem activeIndex={activeIndex} toggle={toggleOptionEditor} handleEdit={(index) => handleToggleMode(index)} data={formData.options} onSave={handleEditSave} />
                        }
                        {
                            toggleOption && !toggleOptionEditor &&
                            <>
                                <div className="form-subtitle">Create item</div>
                                <div className="input-wrapper">
                                    <input type="text" placeholder="Option" required onChange={handleOptionInput} />
                                </div>
                            </>
                        }
                        <div className="flex-column">
                            {!activeIndex && !toggleOptionEditor && <div className={`action-button ${!toggleOption ? 'primary' : 'danger'}`} onClick={handleToggleOption}>{!toggleOption ? `Add item` : 'Dismiss'}</div>}
                            {toggleOption && <div className={`action-button primary`} onClick={handleSaveOption}>Save</div>}
                        </div>
                        <div className="modal-actions">
                            <div className="action-button danger" onClick={handleClose}>Cancel</div>
                            <div className="action-button primary" onClick={handleSave}>Create</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}
export default ModalCreate