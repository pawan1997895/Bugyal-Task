import React, { useEffect, useState } from 'react'
import { CreateProduct, UpdateProductById } from '../api'
import { notify } from '../utils'

const AddProduct = ({ showModal, setShowModal, fetchProduct, updatePrdObj }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null
    })

    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        if(updatePrdObj) {
            setUpdateMode(true)
            setProduct(updatePrdObj)
        }
    }, [updatePrdObj])

    const resetProductState = () => {
        setProduct({
        name: '',
        price: '',
        description: '',
        image: null,
        })
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({ ...product, [name] : value })
    }

    const handleFileChange = (e) => {
        setProduct({...product, image: e.target.files[0]})
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(product)
        try {
            const {success, message} = 
            updateMode ? 
            await UpdateProductById(product, product._id) : 
            await CreateProduct(product)
            console.log(success, message)
            if(success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            setShowModal(false);
            resetProductState();
            fetchProduct();
        } catch (err) {
            notify('Failed to create product, try again later', 'error')
        }
    }
  return (
    <div className={`modal ${showModal ? 'd-block' : ''}`}
        tabIndex={-1} role='dialog' style={{
            display: showModal ? 'block' : 'none'
        }}
    >
        <div className='modal-dialog' role='document'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5>
                        { updateMode ? 'Update Product' : 'Add Product' }
                    </h5>
                    <button type='button' className='btn-close'
                        onClick={()=>handleClose()}
                    >

                    </button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='name'
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Price</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='price'
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <input 
                                type='text'
                                className='form-control'
                                name='description'
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Image</label>
                            <input 
                                type='file'
                                className='form-control'
                                name='image'
                                onChange={handleFileChange}
                            />
                        </div>

                        <button className='btn btn-primary'>
                            {
                                updateMode ? 'Update' : 'Save'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddProduct