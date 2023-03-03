import React from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "flowbite-react";

import icon from "../assets/Vector 1.png";
import text from "../assets/white.png";
import train from "../assets/tacing.png"

export default function EditModal({show, setShow}){
    return(
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
                                <form className="space-y-6">
                                    <img src={icon} alt="" className="h-15" />
                                    <div className="flex relative top-[-3.5rem] ml-5">
                                        <img className="h-5" src={text} alt="" />
                                        <img className="h-7" src={train} alt="" />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            name="number"
                                            placeholder="No"
                                            // value={login.username}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                        // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="users"
                                            placeholder="users"
                                            // value={login.password}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                        // onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="tiket"
                                            placeholder="Tiket"
                                            // value={login.username}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                        // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="status payment"
                                            placeholder="Status"
                                            // value={login.username}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                        // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <Button
                                        color="success"
                                        type="submit"
                                        className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    //   onClick={(e) => handlerSignIn.mutate(e)}
                                    >
                                        Save
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}