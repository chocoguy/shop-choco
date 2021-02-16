import React, {useState, useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../redux/user/userAction';
import { listProducts, deleteProduct, createProduct } from '../redux/product/productAction';
import { PRODUCT_CREATE_RESET } from '../redux/constants.js' ;

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin){
            history.push('/login')    
        }

        if (successDelete) {
            history.push('/admin/productlist')
        }

        

        if (successCreate) {
            console.log("Create")
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }


    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])




    const deleteHandler = (id) => {
        if(window.confirm('yes?'))
        {
           //delete product
           dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }


    //TODO Create product is cucked.. fix it

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <h1>Loading</h1>}
            { errorDelete && <h1>{errorDelete}</h1> }
            {loadingCreate && <h1>Loading</h1>}
            { errorCreate && <h1>{errorCreate}</h1> }
            {loading ? <h1>Loading</h1> : error ? <h1>Error occured{error}</h1> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}><Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button></LinkContainer>
                                    <Button variant='danger' className="btn-sm" onClick={() => deleteHandler(product._id)}><i class="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default ProductListScreen
