import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct  } from '../redux/product/productAction.js'
import FormContainer from '../components/FormContainer.jsx';
import Message from '../components/Message.jsx';
import { PRODUCT_UPDATE_RESET } from '../redux/constants.js';

const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    //brand, category, countinstock, description


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

//                {loadingUpdate && <h1>Loading</h1>}
//{errorUpdate && <h1>Error update</h1>}
//

    useEffect(() => {
            if(successUpdate){
                dispatch({ type: PRODUCT_UPDATE_RESET })
                history.push('/admin/productlist')
            }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            }
        }
        }, [dispatch, history, productId, product, successUpdate]) //pass in user so it can actually workk

        const uploadFileHandler = async (e) => {
            const file = e.target.files[0]
            const formData = new formData();
            formData.append('image', file)
            setUploading(true)

            try{
                const config = {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }
                const { data } = await axios.post('/api/upload', formData, config)
                setImage(data)
                setUploading(false)
            }catch(error){
                console.error(error)
                setUploading(false)
            }
        }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock

        }))
    }

    return (
        <div>

            <Link to='/admin/productlist' className='btn btn-light my-3'>Go back</Link>

            <FormContainer>
                <h1>Edit product</h1>
                {loadingUpdate && <h1>Loading</h1>}
                {errorUpdate && <h1>error occured: {errorUpdate}</h1>}
                {loading ? <h1>Loading</h1> : error ? <h1>{error}</h1> : (

                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.File id='image-file' label='Choose file' custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <h1>Loading</h1>}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='set brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>count in stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='set category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='set description' value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}


            </FormContainer>
        </div>
    )
}

export default ProductEditScreen