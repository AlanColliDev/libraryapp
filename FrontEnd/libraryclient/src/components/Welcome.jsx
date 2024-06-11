import React from 'react'

export const Welcome = () => {
    const user = JSON.parse(localStorage.getItem('us'));

    return (
        <div className="m-10 flex p-20 align-middle bg-slate-400 justify-center text-sky-950 font-bold text-3xl">
            <h2>Bienvenido a LibraryCore: </h2>
            <p className="font-medium ml-2">{user.username}</p>
        </div>
    )
}
