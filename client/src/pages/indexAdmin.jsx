import React, { useState } from "react";
import { Table } from "flowbite-react"
import action from "../assets/search 1.png";
import edit from "../assets/action.png";
import del from "../assets/trash 1.png";
import ModalDetailTicket from "./detail";
import EditModal from "../components/editModal";
import FooterBar from "../components/footer";
import { useQuery } from "react-query"
import { API } from "../config/api"

export default function ListTransaction() {
    const [modal, setModal] = useState(false)
    const [editMod, setEditMod] = useState(false)
    let { data: myTicket } = useQuery('myTicket', async () => {
        const response = await API.get('/transactions')
        const ubah = response.data.data.length - 1
        console.log("length", ubah)
        return response.data.data
    })
    console.log("ini apa", myTicket)

    return (
        <div>
            <div className="container mx-auto mt-10">
                <div>
                    <h3 className="font-bold text-2xl mb-5">List Transaction</h3>

                    <Table>

                        <Table.Head>
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Users</Table.HeadCell>
                            <Table.HeadCell>Tiket</Table.HeadCell>
                            <Table.HeadCell>Status Payment</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        {myTicket?.map((item, index) => (
                            <Table.Row>

                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.user.fullname}</Table.Cell>
                                <Table.Cell>{item.ticket.start_station.name} - {item.ticket.destination_station.name}</Table.Cell>
                                <Table.Cell>{item.status}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-between">
                                        <img className="cursor-pointer" onClick={() => setModal(true)} src={action} alt="" />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table>
                    {modal && (
                        <ModalDetailTicket
                            show={modal}
                            setShow={setModal}
                        />
                    )}

                </div>

            </div>

            <FooterBar />
        </div>
    )
}