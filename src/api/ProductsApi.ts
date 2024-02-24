import { v4 as uuid } from 'uuid'
import { ref, remove, set, update } from "firebase/database"
import { db } from "../libraries/firebase"
import moment from 'moment';

class ProductAPI {
    async createProduct(formData: Form.FormInputArgs) {
        try {
            const uid = uuid()
            const data: Model.Products = {
                uid: uid,
                name: formData.name,
                category: formData.category,
                price: formData.price,
                cost: formData.cost,
                stock: formData.stock,
                options: formData.options,
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
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
    async updateProduct(uid: string, formData: Model.Products) {
        try {
            const data: Model.Products = {
                name: formData.name,
                category: formData.category,
                price: formData.price,
                cost: formData.cost,
                stock: formData.stock,
                updatedAt: moment().toDate()
            }
            if (formData.options) {
                data.options = formData.options
            }
            const dbRef = ref(db, `products/${uid}`)
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
    async deleteProduct(uid: string) {
        try {
            const dbRef = ref(db, `products/${uid}`)
            remove(dbRef)
            const response: Form.ErrorInterface = {
                messages: "Data deleted!",
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