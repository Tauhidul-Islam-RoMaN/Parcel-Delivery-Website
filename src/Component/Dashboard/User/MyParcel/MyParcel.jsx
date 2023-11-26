import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useBooking from "../../../Hook/useBooking";
import Swal from "sweetalert2";
import { useState } from "react";


const MyParcel = () => {
    const axiosPublic = useAxiosPublic()
    const [selectedItem, setSelectedItem] = useState()
    const [sortedStatus, setSortedStatus] = useState()

    const [bookings, refetch] = useBooking()
    refetch()

    const handleCancel = (booking) => {
        const cancelBooking = {
            address: booking.address,
            deliveryDate: booking.deliveryDate,
            bookingDate: booking.bookingDate,
            latitude: booking.latitude,
            longitude: booking.longitude,
            phone: booking.phone,
            price: booking.price,
            receiversName: booking.receiversName,
            receiversPhone: booking.receiversPhone,
            type: booking.type,
            weight: booking.weight,
            status: "canceled",

        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/bookings/${booking._id}`, cancelBooking)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your Booking is Cancelled",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }

    const handleChange = (e) => {
        e.preventDefault()
        const status = e.target.value
        setSelectedItem(status)

    }

    const handleSort = (e) => {
        e.preventDefault()
        const status = selectedItem
        axiosPublic.get(`/bookings?status=${status}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                setSortedStatus(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="form-control flex justify-end items-end">
                <form onSubmit={handleSort} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-center text-3xl -mt-10">Search By Status</span>
                        </label>
                        <select onChange={handleChange}
                            defaultValue="default"
                            name="assignedMan" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                            id="">
                            <option value="default" >Select a delivery man</option>
                            <option value="pending" >pending</option>
                            <option value="on-the-way" >on-the-way</option>
                            <option value="canceled" >canceled</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-accent">Search</button>
                    </div>
                </form>
            </div>

            <div className="overflow-x-auto mt-10">
                <table className="table table-xs table-pin-cols">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Type</th>
                            <th>Approx. Delivery Date</th>
                            <th>Req. Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th> Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (sortedStatus?.length > 0 ? sortedStatus : bookings).map((booking, index) => <tr className=""
                                key={booking._id}
                            >
                                <th> {index + 1} </th>
                                <td>{booking.type}</td>
                                <td>{ }</td>
                                <td>{booking.deliveryDate}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{ }</td>
                                <td>{booking.status}</td>
                                <td>
                                    {
                                        booking.status === "pending" ? <Link to={`/dashboard/updateParcel/${booking._id}`}><button className="btn btn-accent btn-sm">Update</button></Link> : <button className="btn btn-disabled btn-accent btn-sm">Update</button>
                                    }
                                </td>
                                <td>
                                    {
                                        booking.status === "canceled" ? <button className="btn btn-disabled btn-accent btn-sm">Cancel</button> : <button onClick={() => handleCancel(booking)} className="btn btn-accent btn-sm">Cancel</button>
                                    }
                                </td>
                                <td><button className="btn btn-accent btn-sm">Review</button></td>
                                <td>
                                    {
                                        booking.status === "canceled" ? <button className="btn btn-disabled btn-accent btn-sm">Pay</button> : <button className="btn btn-accent btn-sm">Pay</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default MyParcel;