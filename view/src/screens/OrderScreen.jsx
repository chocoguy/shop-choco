import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../redux/order/orderAction'
import { ORDER_PAY_RESET } from '../redux/constants.js';

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
  
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
  
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    //already have loading and success in state so we need to change the name

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals ( order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
          }

          const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('http://localhost:5000/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            document.body.appendChild(script)
          }


          if (!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        }else if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript()
            } else {
              setSdkReady(true)
            }
          }
        }, [dispatch, orderId, successPay,  order])


        const successPaymentHandler = (paymentResult) => {
            console.log(paymentResult)
            dispatch(payOrder(orderId, paymentResult))
          }


    return loading ? <h1>Loading</h1> : error ? <h2>Error</h2> : <>
        <h1>Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.shippingAddress}, {order.shippingAddress.country}
                                { order.isDelivered ? <h2>Delivered on { order.deliveredAt } </h2> : <h2>Not Delivered</h2> }
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p>
                                { order.isPaid ? <h2>Paid on { order.paidAt } </h2> : <h2>Not paid please pay now</h2> }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {order.orderItems.length === 0 ? <h2>Looks like an order was never placed</h2> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    { item.qty } x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <h1>Loading</h1>}
                                    {!sdkReady ? <h1>Loading</h1> : ( <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen