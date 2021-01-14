import React, {useState, useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../redux/user/userAction';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    }, [dispatch, history])

    const deleteHandler = (id) => {
        console.log("Delete")
    }


    return (
        <div>
            <h1>Users</h1>
            {loading ? <h1>Loading</h1> : error ? <h1>Error occured{error}</h1> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (<i className="fas fa-check" style={{color: 'green'}}></i>) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}><Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button></LinkContainer>
                                    <Button variant='danger' className="btn-sm" onClick={() => deleteHandler(user._id)}><i class="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListScreen
