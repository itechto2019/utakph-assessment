import { useEffect, useState } from 'react'
import { db } from '../libraries/firebase'
import { onValue, ref } from 'firebase/database'
import ProductApi, { Products } from '../api/ProductsApi'
const Home = () => {
    const [products, setProducts] = useState<any[]>([])
    useEffect(() => {
        const dbRef = ref(db, 'products')
        const unsub = onValue(dbRef, (snap) => {
            const data = snap.val()
            const dataToArray = Object.entries(data).map(([key, product]) => product)
            setProducts(dataToArray)
        })
        return () => unsub()
    }, [])
    console.log(products)
    const handleSave = async () => {
        const data: Products.ProductsCreateArgs = {
            name: "Pizza",
            categories: "food",
            cost: 70,
            price: 480,
            stock: 4,
            options: [
                "Small",
                "Medium",
                "Large"
            ]
        }
        const message = await ProductApi.createProduct(data)
        console.log(message)
    }
    return (
        <div>
            <h1>Home</h1>
            <h3>Products</h3>
            <div>
                {products.map((product, key) => (
                    <div key={key}>
                        <p>name: {product.name}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleSave}>save</button>
        </div>
    )
}
export default Home