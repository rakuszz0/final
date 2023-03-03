import React, { useContext, useEffect, useState } from "react";
import { Label, TextInput, Select, Button, Alert } from "flowbite-react"
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { UserContext } from "../contexts/userContext"
import FooterBar from "../components/footer";

export default function AddTicket() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null)
    const [state, _] = useContext(UserContext);

    const [form, setForm] = useState({
        name_train: '',
        type_train: '',
        start_date: '',
        start_station_id: '',
        start_time: '',
        destination_station_id: '',
        arrival_time: '',
        price: '',
        qty: '',
    })
    console.log(form)


    const [station, setStation] = useState();

    const getStation = async () => {
        try {
            const response = await API.get('/stations');
            setStation(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/ticket', form, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            const alert = (
                <Alert color="success" className="font-medium">
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log("ticked berhasil tambah", response.data.data)
            navigate('/index-admin')
        } catch (error) {
            const alert = (
                <Alert color="failure" className="font-medium">
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error)
        }
    })

    useEffect(() => {
        getStation();
    }, [])
    return (
        <>
            <div className="container mx-auto flex justify-center">
                <div className="w-3/4">
                    <h3 className="font-bold mb-5 mt-4 text-3xl">Add Ticket</h3>
                    {message && message}
                    <form className="flex flex-col gap-4 mt-5">
                        <div>
                            <input placeholder="Name Train" onChange={handleChange} type="text" name="name_train" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div id="select">
                            <Select
                                id="jenis"
                                name='type_train'
                                onChange={handleChange}
                                required={true}
                            >
                                <option hidden>Type of Train</option>
                                <option value="Eksekutif Class">Eksekutif Class</option>
                                <option value="Bisnis A">Bisnis A</option>
                                <option value="Bisnis B">Bisnis B</option>
                                <option value="Bisnis C">Bisnis C</option>
                                <option value="Ekonomi A">Ekonomi A</option>
                                <option value="Ekonomi B">Ekonomi B</option>
                                <option value="Ekonomi C">Ekonomi C</option>
                            </Select>
                        </div>
                        <div>
                            <input placeholder="Start Date" onChange={handleChange} type="date" name="start_date" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div>
                            <select
                                name="start_station_id"
                                onChange={handleChange}
                                className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            >
                                <option hidden>Start Station</option>
                                {station?.map((item, index) => (
                                    <option key={index} value={item?.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input type="time" name="start_time" onChange={handleChange} placeholder="Start Time" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div>
                            <select
                                name="destination_station_id"
                                onChange={handleChange}
                                className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            >
                                <option hidden>Destination Station</option>
                                {station?.map((item, index) => (
                                    <option key={index} value={item?.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input type="time" name="arrival_time" onChange={handleChange} placeholder="Arrival Time" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div>
                            <input type="number" name="price" onChange={handleChange} placeholder="Price" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div>
                            <input type="number" name="qty" onChange={handleChange} placeholder="Qty" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div className="flex justify-center items-center">
                            <Button color="success" className="w-full" type="submit" onClick={(e) => handleSubmit.mutate(e)}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterBar />
        </>
    )
}