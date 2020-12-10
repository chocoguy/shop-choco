import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { listProducts } from '../redux/product/productAction';
//import Message from '../components/Message.jsx';
//import Loader from '../components/Loader.jsx';



const HomeScreen = () => {

    const dispatch = useDispatch()

    //const [products, setProducts] = useState([])

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);


    return (
        <Fragment>
            <h1>Latest Products</h1>
            { loading ? <h1>loading..</h1>: error ? <h1>Error</h1> : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product  product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    )
}

export default HomeScreen

//? quick and easy to use key={Math.random() * (900000 - 1 )+ 1}