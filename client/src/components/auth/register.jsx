import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Alert, Button, Label, Select } from 'flowbite-react'; 
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function FormRegister({ show, setShow, setShowLogin }) {
    const [message, setMessage] = useState(null)

    const [register, setRegister] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        address: '',
    });

    const regisHandler = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/register', register)
            const alert = (
                <Alert color="success" className="font-medium">
                    Success
                </Alert>
            )
            setMessage(alert)
            setShowLogin(true)
            setShow(false)
            console.log("berhasil register", response.data.data)
        } catch (error) {
            const alert = (
                <Alert color='failure' className='font-medium'>
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error)
        }
    })

    return (
        <>
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
                        <div className="relative w-80 rounded overflow-y-scroll max-w-md md:h-[400px]">
                            <div className="justify-center bg-white rounded-lg shadow">
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-bold text-center text-gray-900">
                                        Register
                                    </h3>
                                    {message && message}
                                    <form className="space-y-6" action="#">
                                        <div>
                                            <input
                                                type="text"
                                                name="fullname"
                                                id="fullname"
                                                placeholder="Fullname"
                                                value={register.fullname}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                                onChange={(e) => setRegister({
                                                    ...register,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                placeholder="Username"
                                                value={register.username}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                                onChange={(e) => setRegister({
                                                    ...register,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email"
                                                value={register.email}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                                onChange={(e)=> setRegister({
                                                    ...register, 
                                                    [e.target.name]:e.target.value,
                                                })
                                            }
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                value={register.password}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                                onChange={(e)=> setRegister({
                                                    ...register,
                                                    [e.target.name]:e.target.value,
                                                })}
                                            />
                                        </div>
                                        <div id="select">
                                            <select
                                                onChange={(e) =>
                                                    setRegister({
                                                        ...register,
                                                        [e.target.name]: e.target.value,
                                                    })
                                                }
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5'
                                                name="gender"
                                                id="gender"
                                                required={true}
                                            >
                                                <option hidden>Choose One</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder="Phone"
                                                value={register.phone}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                                onChange={(e)=> setRegister({
                                                    ...register,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            />
                                        </div>
                                        <div>
                                            <textarea 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                            name="address"
                                            value={register.address}
                                            onChange={(e) => {
                                                setRegister({
                                                    ...register,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }}
                                            >
                                                Address
                                            </textarea>
                                        </div>
                                        <Button
                                            gradientDuoTone="pinkToOrange"
                                            type="submit"
                                            className="w-full text-white focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={(e) => regisHandler.mutate(e)}
                                        >
                                            Register
                                        </Button>
                                        <div className="text-sm font-medium text-gray-500 text-center">
                                            Already have account? Click{" "}
                                            <span
                                                className="text-blue-700 hover:cursor-pointer"
                                                onClick={() => {
                                                    setShow(false);
                                                    setShowLogin(true);
                                                }}
                                            >
                                                Here
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </>
        </>
    )
}