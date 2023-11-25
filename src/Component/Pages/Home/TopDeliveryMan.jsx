import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const TopDeliveryMan = () => {
    const [topDeliveryMan, setTopDeliveryMan] = useState()

    useEffect(() => {
        fetch('/public/deliveryman.json')
            .then(res => res.json())
            .then(data => {
                setTopDeliveryMan(data)
            })
    }, [topDeliveryMan])
    return (
        <div className="bg-[#3bbcc0] py-16">
            <h2 className='font-bold text-3xl text-center py-10'> --Meet Our Top Delivery Man-- </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">

                {topDeliveryMan?.map(deliveryMan => <div
                    key={deliveryMan?.image}
                >
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <figure>
                            <img className="rounded-t-lg" src={deliveryMan?.image} alt="" />
                        </figure>
                        <div className="p-5">
                            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{deliveryMan.name}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Parcel Delivered:  {deliveryMan?.parcels_delivered} </p>
                            <div className="flex items-center justify-start gap-3">
                                <div className=" font-normal text-gray-700 dark:text-gray-400"> Average Rating </div>
                                <Rating
                                    value={deliveryMan?.average_ratings}
                                    readOnly
                                    style={{ maxWidth: 180 }}
                                ></Rating>
                            </div>

                        </div>
                    </div>

                </div>)}
            </div>
        </div>
    );
};

export default TopDeliveryMan;