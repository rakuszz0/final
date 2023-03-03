import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react'
import { Alert, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function FormLogin({ show, setShow, setShowRegister }) {
    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const [login, setLogin] = useState({
        username: '',
        password: '',
    })

    const handlerLogin = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post('/login', login)
            console.log(response.data.data);
            const alert = (
                <Alert color="success" className='font-medium'>
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log("user login", response.data.data)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data
            })
            setShow(false)
            navigate('/')
        } catch (error) {
            const alert = (
                <Alert color="failure" className='font-medium'>
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error)
        }
    })
    return (
        <>
            <Dialog
                open={show}
                as="div"
                className="fixed inset-0 flex items-end md:items-center justify-center px-3 backdrop-blur"
                onClose={() => setShow(false)}
            >
                <Dialog.Panel
                    id="authentication-modal"
                    tabIndex="-1"
                    className="relative z-10"
                >
                    <div className="w-80 h-full max-w-md md:h-auto">
                        <div className="justify-center bg-white rounded-lg shadow">
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-bold text-center text-gray-900">
                                    Login
                                </h3>
                                {message && message}
                                <form className="space-y-6 mt-4" action="#">
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Username"
                                            value={login.username}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                            onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            value={login.password}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                            onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <Button
                                        gradientDuoTone="pinkToOrange"
                                        type="submit"
                                        className="w-full text-white focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={(e) => handlerLogin.mutate(e)}
                                    >
                                        Sign In
                                    </Button>
                                    <div className="text-sm font-medium text-gray-500 text-center">
                                        Not registered?{" "}
                                        <span
                                            className="text-blue-700 hover:cursor-pointer"
                                            onClick={() => {
                                                setShow(false);
                                                setShowRegister(true);
                                            }}
                                        >
                                            Create account
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}