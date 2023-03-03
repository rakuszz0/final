import React from "react";
import iklan from '../assets/Iklan.png'

export default function LandingPage() {
    return(
        <>
            <div className="w-full h-72 bg-gradient-to-r from-left-color to-right-color ...">
                <div className="flex justify-center items-center">
                    <div className="text-2xl text-white flex-[50%] text-center">
                        <h3>Selamat Pagi, Ticket Seekers !</h3>
                        <p>Ingin Pulkam dengan Good Deal ?</p>
                        <p>Masuk atau Daftar Sekarang ! !</p>
                    </div>
                    <div className="flex-[50%] py-5">
                        <img src={iklan} alt="iklan" />
                    </div>
                </div>
            </div>
        </>
    )
}