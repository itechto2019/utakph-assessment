import { useState } from "react";
import validator from "../../helpers/validations/Validators";
import AlertMessage from "../alerts/AlertMessage";
import ProductApi from "../../api/ProductsApi";
import FormItem from "./FormItem";
interface Prop {
    toggle: boolean;
    data: Model.Products;
}
const ModalEdit = ({ toggle, data }: Prop) => {
    const [info, setAlert] = useState<Form.ErrorInterface | undefined>()
    const [toggleOption, setToggleOption] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>()
    const [toggleOptionEditor, setToggleOptionEditor] = useState<boolean>(false)
    const [formOptions, setFormOptions] = useState<Form.FormDataInputOption>()
    const [formData, setFormData] = useState<Model.Products>(data)
    const handleInput = (event: any) => {
        const { name, value }: Form.FormDataInputText = event.target
        setFormData((prev: any) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSave = async (e: any) => {
        e.preventDefault()
        // const error = await validator.validateFormCreate(formData)
        // if (error) {
        //     setAlert({
        //         messages: error.messages,
        //         type: error.type
        //     })
        //     console.log(error)
        //     return
        // }
        // const result = await ProductApi.updateProduct(formData)
        // setAlert({
        //     messages: result.messages,
        //     type: result.type
        // })
        handleClose()
    }
    const handleClose = () => {
        // onSubmit(false)
    }
    const handleOptionInput = (e: any) => {
        const { name, value }: Form.FormDataInputText = e.target
        const prop_name = name.replace('opt_', '')
        setFormOptions((prev: any) => {
            return {
                ...prev,
                [prop_name]: value
            }
        })
    }
    const handleSaveOption = async () => {
        const error = await validator.validateOption(formOptions)
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
                options: [...prev.options, formOptions]
            }
        })
        setFormOptions({
            name: '',
            stock: '',
            price: '',
            cost: ''
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

    const handleEditSave = async (index: number, newData: Form.FormDataInputOption) => {
        if (!formData.options) return
        const previous = formData.options.filter((opt, idx) => idx !== index)
        const updated_items = [...previous, newData]

        const error = await validator.validateOption(newData)
        if (error) {
            setAlert((prev: any) => {
                return {
                    ...prev,
                    messages: [
                        ...prev.messages,
                        ...error.messages
                    ]
                }
            })
            return
        }
        setFormData((prev: any) => {
            return {
                ...prev,
                options: updated_items
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
                    <div className="modal-title">Modal Title</div>
                </div>
                <div className="modal-body">
                    <div className="modal_subtitle">Create Product</div>
                    <AlertMessage
                        messages={info?.messages}
                        type={info?.type}
                    />
                    <form className="modal-form">
                        <div className="flex-column">
                            <div className="input-wrapper">
                                <input type="text" name="name" placeholder="Name" defaultValue={data?.name} required onChange={handleInput} />
                            </div>
                            <div className="input-wrapper">
                                <input type="text" name="category" placeholder="Category" required onChange={handleInput} />
                            </div>
                        </div>
                        <div className="flex-column">
                            <div className="input-wrapper">
                                <input type="text" name="price" placeholder="Price" required onChange={handleInput} />
                            </div>
                            <div className="input-wrapper">
                                <input type="text" name="cost" placeholder="Cost" required onChange={handleInput} />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <input type="text" name="stock" placeholder="Stock" required onChange={handleInput} />
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
                                <div className="flex-column">
                                    <div className="input-wrapper">
                                        <input type="text" name="opt_name" placeholder="Name" required onChange={handleOptionInput} />
                                    </div>
                                    <div className="input-wrapper">
                                        <input type="text" name="opt_price" placeholder="Price" required onChange={handleOptionInput} />
                                    </div>

                                </div>
                                <div className="flex-column">
                                    <div className="input-wrapper">
                                        <input type="text" name="opt_stock" placeholder="Stock" required onChange={handleOptionInput} />
                                    </div>
                                    <div className="input-wrapper">
                                        <input type="text" name="opt_cost" placeholder="Cost" required onChange={handleOptionInput} />
                                    </div>
                                </div>
                            </>
                        }
                        <div className="flex-column">
                            {!activeIndex && !toggleOptionEditor && <div className={`action-button ${!toggleOption ? 'primary' : 'danger'}`} onClick={handleToggleOption}>{!toggleOption ? `Add item` : 'Dismiss'}</div>}
                            {toggleOption && <div className={`action-button primary`} onClick={handleSaveOption}>Save</div>}
                        </div>
                        <div className="modal-actions">
                            <div className="action-button danger" onClick={handleClose}>Cancel</div>
                            <div className="action-button primary" onClick={handleSave}>{mode === "create" ? `Create` : 'Update'}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}
export default ModalEdit