import React, { useState, useEffect } from "react";
import LandingPage from "./landingPage";
import FooterBar from "../components/footer";
import { Card, Table } from "flowbite-react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

import train from "../assets/train.png"
import panah from "../assets/Rounded.png"
import { Button, Checkbox } from "flowbite-react";
import MyModal from "../components/modalAdd";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import TicketList from "./ticketList";
import { useNavigate } from "react-router-dom";


export default function HomeTicket({ setShow }) {
    // let navigate = useNavigate
    const [showLogin, setShowLogin] = useState(false)
    const [state, _] = useContext(UserContext)
    const [result, setResult] = useState();

    useEffect(() => {
        if (state.isLogin === true) {
            setShowLogin(false)
        }
    }, [state.isLogin])

    const [ticket, setTicket] = useState()
    const [formSearch, setFormSearch] = useState({
        start_station_id: '',
        destination_station_id: '',
        start_date: '',
        qty: '',
    })

    const handleChange = (e) => {
        setFormSearch({
            ...formSearch,
            [e.target.name]: e.target.value,
        });
    }

    let { data: tickets } = useQuery('ticketCache', async () => {
        const response = await API.get('/tickets');
        return response.data.data;
    })

    const handleSearch = (e) => {
        e.preventDefault();
        const search = tickets.filter((ticket) => {
            return (
                (formSearch.start_station_id === "" || ticket.start_station_id === formSearch.start_station_id) &&
                (formSearch.destination_station_id === "" || ticket.destination_station_id === formSearch.destination_station_id) &&
                (formSearch.start_date === "" || ticket.start_date === formSearch.start_date) && (formSearch.qty <= ticket.qty)
            );
        });
        setTicket(search);
        console.log("ini data filter", search)
    };



    // function timeDuration() {
    //     // const getSeconds = s => s.split(":").reduce((acc, curr) => acc * 60 + +curr, 0);
    //     const start_time = tickets.start_time
    //     const arrival_time = tickets.arrival_time
    //     // console.log(start_time)
    //     // console.log(arrival_time)

    //     const response = Math.abs(arrival_time - start_time);
    //     var hours = Math.floor(response / 3600)
    //     var minutes = Math.floor(response % 3600 / 60)
    //     console.log(response)
    //     return hours + minutes
    // }


    const [station, setStation] = useState();
    const getStation = async () => {
        try {
            const response = await API.get('/stations');
            setStation(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStation();
    }, [])

    return (
        <>
            <LandingPage />
            <div className="relative top-[-2rem] flex mx-40 rounded-md shadow-xl">
                <div className="bg-slate-300 flex-[20%] rounded-l-md">
                    <div className="flex items-center bg-white mt-6">
                        <img src={train} alt="train" />
                        <div className="font-bold">
                            <h6>Train ticket</h6>
                        </div>
                    </div>
                </div>
                <div className="flex-[80%] bg-white p-3 rounded-r-md">
                    <form>
                        <h4 className="font-semibold">Train ticket</h4>
                        <div className="flex">
                            <div className="flex-[50%]">
                                <div>
                                    <label
                                        htmlFor="start"
                                        className="block mb-2 text-sm font-bold text-gray-900"
                                    >
                                        Start
                                    </label>
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
                                <div className="flex">
                                    <div className="mt-3">
                                        <label htmlFor="start_date" className="block mb-2 text-sm font-bold text-gray-900">Start Date</label>
                                        <input onChange={handleChange} value={formSearch.start_date} type="date" id="start_date" name="start_date" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5" />
                                    </div>
                                    <div className="flex-[50%] w-auto">
                                        <div className="flex items-center justify-center mt-3.5">
                                            <Checkbox id="pp" name="checkbox" />
                                            <label className="ml-2 block text-sm font-bold text-gray-900">
                                                Rounded - Trip
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start mt-7 mx-10">
                                <img className="w-12 h-10" src={panah} alt="" />
                            </div>
                            <div className="flex-[50%]">
                                <div>
                                    <label
                                        htmlFor="destination"
                                        className="block mb-2 text-sm font-bold text-gray-900"
                                    >
                                        Destination
                                    </label>
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
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <label
                                            htmlFor="qty"
                                            className="block my-1 text-sm text-center font-bold text-gray-900"
                                        >
                                            Adults
                                        </label>
                                        <input
                                            type="text"
                                            name="qty"
                                            id="qty"
                                            className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                            onChange={handleChange}
                                            value={formSearch.qty}
                                        />
                                    </div>
                                    <div className="mr-2">
                                        <label
                                            htmlFor="anak"
                                            className="block my-1 text-center text-sm font-bold text-gray-900"
                                        >
                                            Childs
                                        </label>
                                        <input
                                            type="text"
                                            name="anak"
                                            id="anak"
                                            className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Button
                                        onClick={(e) => handleSearch(e)}
                                        gradientDuoTone="pinkToOrange"
                                        type="submit"
                                        className="w-full text-white mt-6 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-1 text-center"
                                    >Search Ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mx-auto mt-5">
                <Card>
                    <div className="flex justify-between font-bold">
                        <h2 className="font-bold">Nama Kereta</h2>
                        <h2 className="font-bold">Berangkat</h2>
                        <h2 className="text-white">Jeda</h2>
                        <h2 className="font-bold">Tiba</h2>
                        <h2 className="font-bold">Durasi</h2>
                        <h2 className="font-bold">Harga Per Orang</h2>
                    </div>
                </Card>
                <TicketList tickets={ticket} />
            </div>
            <FooterBar />
        </>
    )
}