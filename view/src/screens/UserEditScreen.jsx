import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../redux/user/userAction.js'
import FormContainer from '../components/FormContainer.jsx';
import { USER_UPDATE_RESET } from '../redux/constants.js';
import Message from '../components/Message.jsx';

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate



    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        }
        else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, userId, user, successUpdate]) //pass in user so it can actually workk



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }

    return (
        <div>

            <Link to='/admin/userlist' className='btn btn-light my-3'>Go back</Link>

            <FormContainer>
                <h1>Edit user</h1>
                {loadingUpdate && <h1>Loading</h1>}
                {errorUpdate && <h1>Error update</h1>}
                {loading ? <h1>Loading</h1> : error ? <h1>{error}</h1> : (

                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox' placeholder='Is admin?' value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>

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

export default UserEditScreen