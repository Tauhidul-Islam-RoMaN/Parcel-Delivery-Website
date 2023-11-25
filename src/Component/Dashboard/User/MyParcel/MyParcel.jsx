import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useBooking from "../../../Hook/useBooking";
import Swal from "sweetalert2";


const MyParcel = () => {
    const axiosPublic = useAxiosPublic()

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
    const handleSort=() =>{

    }

    return (
        <>
            <div className="form-control class flex flex-col justify-end items-end">
                <label className="label">
                    <span className="label-text">Sort item by Status</span>
                </label>
                <select defaultValue="default" 
                // {...register("weight", { required: true })} 
                onChange={(e) => {handleSort(e.target.value)}
            } 
                className="p-3 w-1/6 text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none">
                    <option disabled value="default">Select a category</option>
                    <option value="pending">pending</option>
                    <option value="canceled">canceled</option>
                    <option value="on-the-way">on-the-way</option>
                </select>
                {/* {errors.weight && <span className="text-red-600">Parcel weight is required</span>} */}
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
                            bookings.map((booking, index) => <tr className=""
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