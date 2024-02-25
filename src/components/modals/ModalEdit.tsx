import { useState } from "react";
import validator from "../../helpers/validations/Validators";
import AlertMessage from "../alerts/AlertMessage";
import ProductApi from "../../api/ProductsApi";
import FormItem from "./FormItem";
import { useDispatch, useSelector } from "react-redux";
interface Prop {
    onSubmit: (arg: boolean) => void;
    toggle: boolean;
    title: string;
}

const ModalEdit = ({ title, toggle, onSubmit }: Prop) => {
    const { data } = useSelector((state: any) => state.form)
    const [info, setAlert] = useState<Form.ErrorInterface | undefined>()
    const [toggleOption, setToggleOption] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>()
    const [formData, setFormData] = useState({
        name: data?.name,
        category: data?.category,
        cost: data?.cost,
        price: data?.price,
        stock: data?.stock,
        options: data?.options ?? []
    })
    console.log(formData)
    const [toggleOptionEditor, setToggleOptionEditor] = useState<boolean>(false)
    const [option, setOption] = useState<string>('')

    const dispatch = useDispatch()
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
        const form: Form.FormInputArgs = {
            name: formData?.name,
            category: formData?.category,
            cost: parseFloat(formData?.cost),
            price: parseFloat(formData?.price),
            stock: parseInt(formData?.stock),
            options: formData?.options ?? data.options
        }
        const error = await validator.validateProductForm(form)
        if (error) {
            setAlert({
                messages: error.messages,
                type: error.type
            })
            return
        }
        setAlert(undefined)
        const result = await ProductApi.updateProduct(data.uid, form)
        setAlert(result)
        handleClose()
    }
    const handleClose = () => {
        onSubmit(false)
        setAlert(undefined)
        dispatch({ type: 'form/setFormData', payload: null })
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
                options: prev.options ? [...prev.options, option] : [option]
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
        const previous = formData.options
        const array_updated = previous.map((pr : any, idx : number) => idx === index ? item : pr)
        const error = await validator.validateOption(item)
        if (error) {
            setAlert(error)
            return
        }
        setFormData((prev: any) => {
            return {
                ...prev,
                options: array_updated
            }
        })
        setActiveIndex(undefined)
        setToggleOptionEditor(!toggleOptionEditor)
        setAlert(undefined)
    }
    const handleToggleOption = () => {
        setToggleOption(!toggleOption)
    }
    return toggle && data && <div className="modal-overlay">
        <div className="modal">
            <div className="modal-form">
                <div className="modal-header">
                    <div className="modal-title">Update Form</div>
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
                            !toggleOption && formData.options && formData.options?.length > 0 &&
                            <FormItem
                                activeIndex={activeIndex}
                                toggle={toggleOptionEditor}
                                handleEdit={(index) => handleToggleMode(index)}
                                data={formData.options}
                                onSave={handleEditSave}
                            />
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
                            <div className="action-button primary" onClick={handleSave}>Update</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}
export default ModalEdit