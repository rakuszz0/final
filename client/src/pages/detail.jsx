import React from "react";
import { Button, Card, Modal, Table } from "flowbite-react"
import { Dialog } from "@headlessui/react";
import { API } from "../config/api";
import { useQuery } from "react-query"
import icon from "../assets/Vector 1.png";
import text from "../assets/white.png";
import train from "../assets/tacing.png"
import qr from "../assets/qr.png";

export default function ModalDetailTicket({ show, setShow }) {
    let { data: myTicket } = useQuery('myTicket', async () => {
        const response = await API.get('/order-user')
        const ubah = response.data.data.length - 1
        // let length = response.data.data
        console.log("length", ubah)
        return response.data.data
    })
    console.log("response tiket", myTicket)
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
                    <div className="w-[700px]">
                        <Card>
                            {myTicket?.map((item, index) => (
                                <div>

                                    <img src={icon} alt="" className="h-15" />

                                    <div className="flex relative top-[-2rem] ml-5 mt-1">
                                        <img className="h-5" src={text} alt="" />
                                        <img className="h-7" src={train} alt="" />
                                    </div>
                                    <h2 className="font-bold text-lg mb-3">INVOICE</h2>

                                    <div className="mb-4">
                                        <h2 className="font-bold">Kereta Api</h2>
                                        <h2 className="text-sm">Saturday, 21 February 2020</h2>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="font-bold">{item.ticket.name_train}</h2>
                                        <h2 className="text-sm">{item.ticket.type_train}</h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-[70%] justify-between">
                                            <div className="flex-[50%]">
                                                <h6 className="font-bold">{item.ticket.start_time}</h6>
                                                <h6 className="text-sm mb-4">{item.ticket.start_date}</h6>
                                                <h6 className="font-bold">{item.ticket.arrival_time}</h6>
                                                <h6 className="text-sm">{item.ticket.start_date}</h6>
                                            </div>
                                            <div className="flex-[50%]">
                                                <h6 className="font-bold">{item.ticket.start_station.kota}</h6>
                                                <h6 className="text-sm mb-4">Stasiun {item.ticket.start_station.name}</h6>
                                                <h6 className="font-bold">{item.ticket.destination_station.kota}</h6>
                                                <h6 className="text-sm">Stasiun {item.ticket.destination_station.name}</h6>
                                            </div>
                                        </div>
                                        <div className="flex-[30%]">
                                            <img className="w-28" src={qr} alt="" />
                                        </div>
                                    </div>
                                    <Table className="mt-2">
                                        <Table.Head>
                                            <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                                            <Table.HeadCell>Nama Pemesanan</Table.HeadCell>
                                            <Table.HeadCell>No. Handphone</Table.HeadCell>
                                            <Table.HeadCell>Email</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Row>
                                            <Table.Cell>{item.user.id}</Table.Cell>
                                            <Table.Cell>{item.user.fullname}</Table.Cell>
                                            <Table.Cell>{item.user.phone}</Table.Cell>
                                            <Table.Cell>{item.user.email}</Table.Cell>
                                        </Table.Row>
                                    </Table>
                                    <div className="flex justify-between bg-slate-300 rounded-md p-3 mt-3">
                                        <h2 className="font-semibold text-lg">Total</h2>
                                        <h2 className="font-extrabold">Rp. {item.ticket.price}</h2>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}