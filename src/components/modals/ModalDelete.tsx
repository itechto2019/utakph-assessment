import { useState } from "react";
import AlertMessage from "../alerts/AlertMessage";
import ProductApi from "../../api/ProductsApi";
import { useDispatch, useSelector } from "react-redux";
interface Prop {
    onSubmit: (arg: boolean) => void;
    toggle: boolean;
    title: string;
}

const ModalDelete = ({ title, toggle, onSubmit }: Prop) => {
    const { data } = useSelector((state: any) => state.form)
    const [info, setAlert] = useState<Form.ErrorInterface | undefined>()

    const dispatch = useDispatch()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setAlert(undefined)
        const result = await ProductApi.deleteProduct(data.uid)
        setAlert(result)
        handleClose()
        dispatch({ type: 'form/setFormData', payload: null })
    }
    const handleClose = () => {
        onSubmit(false)
        setAlert(undefined)
    }
    return toggle && data && <div className="modal-overlay">
        <div className="modal">
            <div className="modal-form">
                <div className="modal-header">
                    <div className="modal-title">Delete Form</div>
                </div>
                <div className="modal-body">
                    <div className="modal_subtitle">{title}</div>
                    <AlertMessage
                        messages={info?.messages}
                        type={info?.type}
                    />
                    <div className="modal_prompt">Do you want to delete {data.name}?</div>
                    <div className="modal-actions">
                        <div className="action-button primary" onClick={handleClose}>Cancel</div>
                        <div className="action-button danger" onClick={handleSubmit}>Delete</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default ModalDelete