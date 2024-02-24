import { v4 as uuid } from 'uuid'
import { ref, set, update } from "firebase/database"
import { db } from "../libraries/firebase"
import moment from 'moment';

class ProductAPI {
    async createProduct(formData: Form.FormCreateArgs) {
        try {
            const uid = uuid()
            const data: Model.Products = {
                uid: uid,
                name: formData.name,
                category: formData.category,
                price: parseInt(formData.price),
                cost: parseInt(formData.cost),
                stock: parseInt(formData.stock),
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            }
            if (formData?.options && formData?.options.length > 0) {
                data.options = formData.options.map((opt) => {
                    const item_id = uuid()
                    const option: Model.OptionItem = {
                        item_id: item_id,
                        name: opt.name,
                        stock: parseInt(opt.stock)
                    }
                    if (opt?.price) {
                        option.price = parseInt(opt.price)
                    }
                    return option
                })
            }
            const dbRef = ref(db, `products/${uid}`)
            set(dbRef, data)
            const response: Form.ErrorInterface = {
                messages: "Data save!",
                type: "success"
            }
            return response
        } catch (error) {
            const response: Form.ErrorInterface = {
                messages: "Error while saving data.",
                type: "danger"
            }
            return response
        }
    }
    async updateProduct(formData: Model.Products) {
        try {
            const data: Model.Products = {
                name: formData.name,
                category: formData.category,
                price: formData.price,
                cost: formData.cost,
                stock: formData.stock,
                updatedAt: moment().toDate()
            }
            const dbRef = ref(db, `products/${formData.uid}`)
            update(dbRef, data)
            const response: Form.ErrorInterface = {
                messages: "Data updated!",
                type: "success"
            }
            return response
        } catch (error) {
            const response: Form.ErrorInterface = {
                messages: "Error while saving data.",
                type: "danger"
            }
            return response
        }
    }
}
const ProductApi = new ProductAPI()
export default ProductApi