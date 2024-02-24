import { useEffect, useState } from 'react'
import { db } from '../libraries/firebase'
import { onValue, ref } from 'firebase/database'
import moment from 'moment'
import Modal from '../components/modals/ModalCreate'
import ModalEdit from '../components/modals/ModalEdit'
import ModalDelete from '../components/modals/ModalDelete'
import { useDispatch, useSelector } from 'react-redux'
type ModalType = "create" | "edit" | "delete" | string
const Home = () => {
    const { data } = useSelector((state: any) => state.form)
    const [toggle, setToggle] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>()
    const [modalType, setModalType] = useState<ModalType>("")
    const [products, setProducts] = useState<any[]>([])

    const dispatch = useDispatch()
    useEffect(() => {
        const dbRef = ref(db, 'products')
        const unsub = onValue(dbRef, (snap) => {
            const data = snap.val()
            const dataToArray: any = data && Object.values(data).map((product) => product) || null
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
                            <th>Stock</th>
                            <th>Options</th>
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
                                    <td>{product.stock}</td>
                                    <td>
                                        <div className="table-items">
                                            {product.options?.map((opt: string, idx: number) => (<div key={idx}>[{opt}]</div>))}
                                        </div>
                                    </td>
                                    <td>{moment(product.createdAt).format('YYYY-MM-DD hh:mm A')}</td>
                                    <td>
                                        <div className="t-actions">
                                            <div className="action-button primary" onClick={() => {
                                                dispatch({ type: 'form/setFormData', payload: product })
                                                handleToggleEdit(key)
                                                setModalType("edit")
                                            }}>Edit</div>
                                            <div className="action-button danger" onClick={() => {
                                                dispatch({ type: 'form/setFormData', payload: product })
                                                handleToggleEdit(key)
                                                setModalType("delete")
                                            }}>Delete</div>
                                        </div>
                                    </td>
                                    {
                                        data &&
                                        <ModalEdit
                                            title={"Edit Product"}
                                            toggle={activeIndex === key && modalType === "edit"}
                                            onSubmit={() => {
                                                handleToggleEdit(key)
                                                setModalType("")
                                            }}
                                        />
                                    }
                                    {data &&
                                        <ModalDelete
                                            title={"Delete Product"}
                                            toggle={activeIndex === key && modalType === "delete"}
                                            onSubmit={() => {
                                                handleToggleEdit(key)
                                                setModalType("")
                                            }}
                                        />
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {
                toggle &&
                <Modal
                    title={"Create Product"}
                    toggle={toggle}
                    onSubmit={(arg: boolean) => setToggle(arg)}
                />
            }
        </div>
    )
}
export default Home