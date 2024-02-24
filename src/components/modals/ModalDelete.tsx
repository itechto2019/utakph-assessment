import { useState } from "react";
import validator from "../../helpers/validations/Validators";
import AlertMessage from "../alerts/AlertMessage";
import ProductApi from "../../api/ProductsApi";
interface Prop {
    onSubmit: (arg: boolean) => void;
    toggle: boolean;
    data: any;
    title: string;
}

const ModalDelete = ({ title, toggle, data, onSubmit }: Prop) => {
    const [info, setAlert] = useState<Form.ErrorInterface | undefined>()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setAlert(undefined)
        const result = await ProductApi.deleteProduct(data.uid)
        setAlert(result)
        handleClose()
    }
    const handleClose = () => {
        onSubmit(false)
        setAlert(undefined)
    }
    return toggle && <div className="modal-overlay">
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