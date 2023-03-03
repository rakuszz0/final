import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Card } from "flowbite-react";
import moment from "moment";
import arow from "../assets/Arrow 5.png";
import { UserContext } from "../contexts/userContext";
import MyModal from "../components/modalAdd";
import FormLogin from "../components/auth/login";

export default function TicketList(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [state, _] = useContext(UserContext)
    const [showLogin, setShowLogin] = useState(false)

    // let start = moment(tickets.start_time);
    // let end = moment(tickets.arrival_time);
    // let diff = end.diff(start);

    let { data: tickets } = useQuery('ticketCache', async () => {
        const response = await API.get('/tickets');
        return response.data.data;
    })



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
    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    const HandleBuyying = async (id) => {
        try {
            const response = await API.post(`/create-trans/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            setIsOpen(true)
            console.log("ini beli", response.data.data)
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }

    if (props.tickets != undefined) {
        return (
            <>
                {props.tickets?.map((item) => (
                    <Card
                        key={item.id}
                        className="my-5 cursor-pointer"
                        onClick={() => { state.isLogin == false ? setShowLogin(true) : HandleBuyying(item.id) }}
                    >
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-bold">{item.name_train}</h2>
                                <h4 className="text-sm font-serif">{item.type_train}</h4>
                            </div>
                            <div>
                                <h2 className="font-semibold">{item.start_time}</h2>
                                <h4 className="font-semibold">{item.start_station.name}</h4>
                            </div>
                            <div className="flex items-center justify-center">
                                <img src={arow} alt="" className="h-3 w-3" />
                            </div>
                            <div>
                                <h2 className="font-semibold">{item.arrival_time}</h2>
                                <h4 className="font-semibold">{item.destination_station.name}</h4>
                            </div>
                            <div>
                                <h2 className="font-semibold">5 jam 12 m</h2>
                            </div>
                            <div>
                                <h2 className="font-bold">{formatRupiah(item.price)}</h2>
                            </div>
                        </div>
                    </Card>
                ))}

                {isOpen && (
                    <MyModal
                        show={isOpen}
                        setShow={setIsOpen}
                        setIsOpen={setIsOpen}
                    />
                )}
                {showLogin && (
                    <FormLogin
                        show={showLogin}
                        setShow={setShowLogin}
                    />
                )}
            </>
        )
    } else {
        return (
            <>
                {tickets?.map((item) => (
                    <Card
                        key={item.id}
                        className="my-5 cursor-pointer"
                        onClick={() => { state.isLogin == false ? setShowLogin(true) : HandleBuyying(item.id) }}
                    >

                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-bold">{item.name_train}</h2>
                                <h4 className="text-sm font-serif">{item.type_train}</h4>
                            </div>
                            <div>
                                <h2 className="font-semibold">{item.start_time}</h2>
                                <h4 className="font-semibold">{item.start_station.name}</h4>
                            </div>
                            <div className="flex items-center justify-center">
                                <img src={arow} alt="" className="h-5 w-4" />
                            </div>
                            <div>
                                <h2 className="font-semibold">{item.arrival_time}</h2>
                                <h4 className="font-semibold">{item.destination_station.name}</h4>
                            </div>
                            <div>
                                <h2 className="font-semibold">5j 12 m</h2>
                            </div>
                            <div>
                                <h2 className="font-bold">{formatRupiah(item.price)}</h2>
                            </div>
                        </div>
                    </Card>
                ))}

                {isOpen && (
                    <MyModal
                        show={isOpen}
                        setShow={setIsOpen}
                        setIsOpen={setIsOpen}
                    />
                )}
                {showLogin && (
                    <FormLogin
                        show={showLogin}
                        setShow={setShowLogin}
                    />
                )}
            </>
        )
    }
}