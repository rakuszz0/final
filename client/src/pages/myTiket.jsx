import React, { useContext, useState } from "react";
import { Button, Card, Table } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "../config/api";

import ticket from "../assets/ticket.png";
import icon from "../assets/Vector 1.png";
import text from "../assets/white.png";
import train from "../assets/tacing.png"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function MyTicket() {
    const navigate = useNavigate()
    const [state, _] = useContext(UserContext)
    let { data: myTicket } = useQuery('myTicket', async () => {
        const response = await API.get('/order-user')
        return response.data.data
    })

    const handlePayment = async (id) => {
        try {
            const response = await API.get(`/get-idpayment/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            navigate("/payment")
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Card className="mt-10 rounded-none shadow-none border-0 ml-20">
                <h3 className="font-bold text-xl">My-Ticket</h3>
                {myTicket === null ? (
                    <div>
                        <h2 className="text-center text-red-600 font-semibold text-2xl mb-5">Tiket Not Found.</h2>
                        <div className="flex justify-center items-center">
                            <img src={ticket} alt="" className="w-60 h-52" />
                        </div>
                    </div>
                ) : (
                    <div className="mx-[90px] mt-7">
                        {myTicket?.map((item, index) => (
                            <Card key={index} className="mb-5">
                                <div className="flex">
                                    <div className="flex-[80%]">
                                        <div>
                                            <img src={icon} alt="" className="h-15" />
                                            <div className="flex relative top-[-2rem] ml-5 mt-1">
                                                <img className="h-5" src={text} alt="" />
                                                <img className="h-7" src={train} alt="" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg">{item.ticket.name_train}</h3>
                                                <h6 className="text-sm">{item.ticket.type_train}</h6>
                                                <h6 className="bg-yellow-100 px-2 py-1 mt-2 text-center rounded-sm">{item.status}</h6>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-lg">{item.ticket.start_time}</h5>
                                                <h6 className="text-sm mb-3">{item.ticket.start_date}</h6>
                                                <h5 className="font-bold text-lg">{item.ticket.arrival_time}</h5>
                                                <h6 className="text-sm">{item.ticket.start_date}</h6>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-lg">{item.ticket.start_station.kota}</h5>
                                                <h6 className="text-sm mb-3">{item.ticket.start_station.name}</h6>
                                                <h5 className="font-bold text-lg">{item.ticket.destination_station.kota}</h5>
                                                <h6 className="text-sm">{item.ticket.destination_station.name}</h6>
                                            </div>
                                        </div>
                                        <Table className="mt-3">
                                            <Table.Head>
                                                <Table.HeadCell>Identity Number</Table.HeadCell>
                                                <Table.HeadCell>Customer Name</Table.HeadCell>
                                                <Table.HeadCell>No. Hp</Table.HeadCell>
                                                <Table.HeadCell>Email</Table.HeadCell>
                                            </Table.Head>
                                            <Table.Row>
                                                <Table.Cell>{item.user.id}</Table.Cell>
                                                <Table.Cell>{item.user.fullname}</Table.Cell>
                                                <Table.Cell>{item.user.phone}</Table.Cell>
                                                <Table.Cell>{item.user.email}</Table.Cell>
                                            </Table.Row>
                                        </Table>
                                    </div>
                                    <div className="flex-[20%] text-center">
                                        <h3 className="font-bold text-lg">Kereta API</h3>
                                        <h6 className="text-md font-semibold">Sabtu, {item.ticket.start_date}</h6>
                                        <Button
                                            onClick={() => handlePayment(item.id)}
                                            className="px-10 mt-36 mx-auto"
                                            outline={false}
                                            gradientDuoTone="pinkToOrange">
                                            Pay Now
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Card>
        </>
    )
}