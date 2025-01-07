import React from 'react'
import { Link } from 'react-router-dom'

const ProductTable = ({
    products,
    pagination,
    fetchProduct,
    handleUpdateProduct,
    handleDeleteProduct
}) => {
    const headers = ['Name', 'Price', 'Description', 'Actions']
    const {currentPage, totalPages} = pagination;

    const TableRow = ({product}) => {
        return <tr>
            <td>
                <Link to={`/product/${product._id}`} className='text-decoration-none'>
                    {product.name}
                </Link>
            </td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>
                <i
                    className='bi bi-pencil-fill text-warning me-4'
                    role='button'
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    onClick={() => handleUpdateProduct(product)}
                > 
                </i>

                <i
                    className='bi bi-trash-fill text-danger'
                    role='button'
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    onClick={() => handleDeleteProduct(product)}
                > 
                </i>
            </td>
        </tr>
    }

    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)

    const handleNextPage = ()=>{
        if(currentPage < totalPages){
            handlePagination(currentPage + 1)
        }
    }

    const handlePreviousPage = ()=>{
        if(currentPage > 1){
            handlePagination(currentPage - 1)
        }
    }

    const handlePagination = (currPage)=>{
        fetchProduct('', currPage, 5)
    }

  return (
    <>
        <table className='table table-striped'>
            <thead>
                <tr>
                    {
                        headers.map((header, index)=>(
                            <th key={index}>{header}</th>
                        ))
                    }
                </tr>
            </thead>

            <tbody>
                {
                    products.map((prd) => (
                        <TableRow key={prd._id} product={prd} />
                    ))
                }
               
            </tbody>      
        </table>

        <div className='d-flex justify-content-between align-items-center my-3'>
                <span className='badge bg-primary'>Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className='btn btn-outline-primary me-2'
                        onClick={()=>handlePreviousPage()}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {
                        pageNumbers.map((page)=>(
                            <button
                                onClick={()=>handlePagination(page)}  
                                className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}>
                                {page}
                            </button>
                        ))
                    }

                    <button
                        className='btn btn-outline-primary ms-2'
                        onClick={()=>handleNextPage()}
                        disabled={totalPages === currentPage}
                    >
                        Next
                    </button>
                </div>
            </div>
    </>
  )
}

export default ProductTable