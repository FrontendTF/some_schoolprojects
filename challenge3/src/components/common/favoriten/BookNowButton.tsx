import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BookNowButton = () => {
    const navigat = useNavigate()

    const buchen = () =>{
        navigat("/Booking")
    }

  return (
    <button onClick={buchen} className='bg-blue-500 text-white font-bold px-3 py-1 rounded-2xl w-fit uppercase md:hover:bg-blue-700'> buchen </button>
)
}
