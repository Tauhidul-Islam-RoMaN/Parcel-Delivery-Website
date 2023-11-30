import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";


const MyParcel = () => {
    const axiosPublic = useAxiosPublic()
    const [selectedItem, setSelectedItem] = useState('')
    const [sortedStatus, setSortedStatus] = useState('')
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { user } = useAuth()
    console.log(user);
    const today = new Date().toISOString().split("T")[0];

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/bookings?email=${user?.email}`)
            return result.data
        }
    })
    console.log(bookings);


    const handleReview = (booking) => {

        setSelectedBooking(booking);
    }
    useEffect(() => {
        if (selectedBooking) {
            document.getElementById('my_modal_5').showModal();
            refetch()
        }
    }, [refetch, selectedBooking]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const userName = e.target.name.value
        const dmId = e.target.dmId.value
        const review = e.target.review.value
        const rating = e.target.rating.value
        const userPhoto = user?.photoURL
        const reviewDate = today


        const reviewInfo = {
            userName, dmId, review, rating, userPhoto, reviewDate
        }
        axiosPublic.post('/reviews', reviewInfo)
            .then(res => {
                console.log('booking updated', res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => console.log(err))

    };

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
            // axiosPublic.get(`/bookings?status=${status}&user=${user?.email}`) 
            .then(response => {
                const data = response.data;
                console.log(data);
                const filteredData = data.filter(item => item.email === user?.email)
                console.log(filteredData);
                setSortedStatus(filteredData)
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
                            <option value="default" >Choose Your Status</option>
                            <option value="pending" >pending</option>
                            <option value="on-the-way" >on-the-way</option>
                            <option value="canceled" >canceled</option>
                            <option value="delivered" >delivered</option>
                            {/* <option value="returned" >returned</option> */}
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
                        {/* sortedStatus?.length = 0 && <p className="flex items-center justify-center text-red-600"> No data for this status </p> */}

                        {
                            (sortedStatus?.length > 0 ? sortedStatus : bookings).map((booking, index) => <tr className=""
                                key={booking._id}
                            >
                                <th> {index + 1} </th>
                                <td>{booking.type}</td>
                                <td>{booking.departureDate}</td>
                                <td>{booking.deliveryDate}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.dmId}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {
                                        booking.status === "pending" ? <Link to={`/dashboard/updateParcel/${booking._id}`}><button className="btn btn-accent btn-sm">Update</button></Link> : <button className="btn btn-disabled btn-accent btn-sm">Update</button>
                                    }
                                </td>
                                <td>
                                    {
                                        (booking.status === "canceled" || booking.status === "delivered" || booking.status === "on-the-way") ? <button className="btn btn-disabled btn-accent btn-sm">Cancel</button> : <button onClick={() => handleCancel(booking)} className="btn btn-accent btn-sm">Cancel</button>
                                    }
                                </td>
                                <td>
                                    {
                                        booking.status === "delivered" ? <button onClick={() => handleReview(booking)} className="btn btn-accent btn-sm">Review</button> : <button className="btn btn-disabled btn-accent btn-sm">Review</button>
                                    }
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            {selectedBooking && (
                                                <>
                                                    <div>
                                                        <p className="py-4">Press ESC key to close</p>
                                                    </div>
                                                    <h2 className="text-center font-bold text-3xl "> Give a review </h2>
                                                    <div className="modal-action">
                                                        <form onSubmit={handleSubmit} className="card-body">
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">User's Name</span>
                                                                </label>
                                                                <input type="text" name="name" readOnly defaultValue={selectedBooking.name} placeholder="Users Name"
                                                                    className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">User's Photo</span>
                                                                </label>
                                                                <input type="text" name="user-img" readOnly defaultValue={user?.photoURL} placeholder="Users Photo"
                                                                    className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Provide Rating out of 5</span>
                                                                </label>
                                                                <input type="number" name="rating" step="0.1" max="5" min="1" placeholder="5.0"
                                                                    className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Delivery Man's Id</span>
                                                                </label>
                                                                <input type="text" name="dmId" readOnly defaultValue={selectedBooking.dmId} placeholder="Delivery man's Id"
                                                                    className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Feedback </span>
                                                                </label>
                                                                <textarea name="review" id="" cols="4" rows="4" placeholder="Provide your feedback here" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"></textarea>
                                                            </div>
                                                            <div className="form-control mt-6">
                                                                <button className="btn btn-accent">Submit</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </>

                                            )}
                                        </div>
                                    </dialog>
                                </td>
                                <td>
                                    {
                                        (booking.status === "canceled" || booking.status === "delivered") ? <button className="btn btn-disabled btn-accent btn-sm">Pay</button> : <button className="btn btn-accent btn-sm">Pay</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* <MyModal></MyModal> */}
        </>

    );
};

export default MyParcel;