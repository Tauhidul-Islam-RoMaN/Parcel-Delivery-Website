import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    // const [myDeliveries, setMyDeliveries] = useState([])

    const { data: myDeliveries = [], refetch } = useQuery({
        queryKey: ['myDeliveries'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/deliveryman?email=${user?.email}`)
            const data = await result.data
            return data
        }
    })

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
            departureDate: booking.departureDate,
            dmId: booking.dmId,
            assignedMan:booking.assignedMan,

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
    const handleDelivery= (booking) => {
        const confirmBooking = {
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
            status: "delivered",
            departureDate: booking.departureDate,
            dmId: booking.dmId,
            assignedMan:booking.assignedMan,

        }
        Swal.fire({
            title: "Are you want to make it delivered?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/bookings/${booking._id}`, confirmBooking)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Booking is delivered",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="overflow-x-auto mt-10">
            <table className="table table-xs table-pin-cols ">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Booked By</th>
                        <th>Receiver's Name</th>
                        <th>User Phone</th>
                        <th>Req. Deli.</th>
                        <th>Appx. Deli.</th>
                        <th>Receiver's Phone</th>
                        <th>Receiver's Add.</th>
                        <th>Location</th>
                        <th>Cancel</th>
                        <th>Deliver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myDeliveries?.map((booking, index) => <tr className=""
                            key={booking._id}
                        >
                            <th> {index + 1} </th>
                            <td>{booking.name}</td>
                            <td>{booking.receiversName}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.deliveryDate}</td>
                            <td>{booking.departureDate}</td>
                            <td>{booking.receiversPhone}</td>
                            <td>{booking.address}</td>
                            <td>
                                <button className="btn btn-accent btn-sm">View Location</button>

                            </td>
                            <td>
                                {
                                    (booking.status === "canceled" || booking.status === "delivered") ? <button className="btn btn-disabled btn-accent btn-sm">Cancel</button> : <button onClick={() => handleCancel(booking)} className="btn btn-accent btn-sm">Cancel</button>
                                }
                            </td>
                            <td>
                                {
                                    booking.status === "delivered" ? <button className="btn btn-disabled btn-accent btn-sm">Deliver</button> : <button onClick={() => handleDelivery(booking)} className="btn btn-accent btn-sm">Deliver</button>
                                }
                            </td>

                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyDeliveryList;