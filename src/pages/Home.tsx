import { useEffect, useState } from 'react'
import { db } from '../libraries/firebase'
import { onValue, ref } from 'firebase/database'
import moment from 'moment'
import Modal from '../components/modals/Modal'
const Home = () => {
    const [toggle, setToggle] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>()
    const [products, setProducts] = useState<Model.Products[]>([])
    useEffect(() => {
        const dbRef = ref(db, 'products')
        const unsub = onValue(dbRef, (snap) => {
            const data = snap.val()
            const dataToArray: any = data && Object.entries(data).map(([key, product]) => product) || null
            setProducts(dataToArray)
        })
        return () => unsub()
    }, [])
    const toggleModal = () => {
        setToggle(true)
    }
    const handleToggleEdit = (index: number) => {
        if (index === activeIndex) {
            setActiveIndex(undefined)
            return
        }
        setActiveIndex(index)
    }
    return (
        <div className='main'>
            <div className='table-container'>
                <div className="table-wrapper">
                    <h3 className='title-component'>Products</h3>
                    <div className="button-wrapper">
                        <div className="action-button primary" onClick={toggleModal}>Create</div>
                    </div>
                    <table className="table-striped">
                        <tr>
                            <th>#</th>
                            <th>Product name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Cost</th>
                            <th>Variant</th>
                            <th>Date Created</th>
                            <th>Action</th>
                        </tr>
                        <tbody className="t-body">
                            {products?.map((product, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.cost}</td>
                                    <td>{product.options?.map((opt, idx) => (<div key={idx}>{opt.name}</div>))}</td>
                                    <td>{moment(product.createdAt).format('YYYY-MM-DD hh:mm A')}</td>
                                    <td>
                                        <div className="t-actions">
                                            <div className="action-button primary" onClick={() => handleToggleEdit(key)}>Edit</div>
                                            <div className="action-button danger">Delete</div>
                                        </div>
                                    </td>
                                    <Modal
                                        toggle={activeIndex === key}
                                        data={product}
                                        mode="edit"
                                        onSubmit={() => handleToggleEdit(key)}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {
                toggle &&
                <Modal
                    toggle={toggle}
                    onSubmit={(arg: boolean) => setToggle(arg)}
                />
            }
        </div>
    )
}
export default Home