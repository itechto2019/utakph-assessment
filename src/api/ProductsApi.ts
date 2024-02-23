import { v4 as uuid } from 'uuid'
import { ref, set } from "firebase/database"
import { db } from "../libraries/firebase"
import moment from 'moment';

export namespace Products {
    export type ProductsCreateArgs = {
        uid?: string;
        name: string;
        categories: "food" | "clothes" | "accessories";
        options?: string[];
        price: number;
        cost: number;
        stock: number;
        createdAt?: Date;
        updatedAt?: Date;
    }
}
class ProductAPI {

    async createProduct(args: Products.ProductsCreateArgs) {
        try {
            const uid = uuid()
            const data: Products.ProductsCreateArgs = {
                uid: uid,
                categories: args.categories,
                options: args.options,
                name: args.name,
                price: args.price,
                cost: args.cost,
                stock: args.stock,
                createdAt: moment().toDate(),
                updatedAt: moment().toDate()
            }
            const dbRef = ref(db, `products/${uid}`)
            set(dbRef, data)
            return "Data save!"
        } catch (error) {
            return "Error while saving data."
        }
    }
}
const ProductApi = new ProductAPI()
export default ProductApi