import { Link } from "react-router-dom";
import useBookingAll from "../../../Hook/useBookingAll";

const AllParcel = () => {
    const [bookings, refetch] = useBookingAll()
    console.log(bookings);
    return (
        <div className="overflow-x-auto mt-10">
            <table className="table table-xs table-pin-cols">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>User Name</th>
                        <th>Phone Number</th>
                        <th>Booking Date</th>
                        <th>Req. Delivery Date</th>
                        <th> Cost</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking, index) => <tr className=""
                            key={booking._id}
                        >
                            <th> {index + 1} </th>
                            <td>{booking.name}</td>
                            <td>Number</td>
                            <td>{booking.bookingDate}</td>
                            <td>{booking.deliveryDate}</td>
                            <td>{booking.price }</td>
                            <td>{booking.status}</td>
                            <td>
                                {
                                    booking.status === "pending" ? <Link to={`/dashboard/updateParcel/${booking._id}`}><button className="btn btn-accent btn-sm">Manage</button></Link> : <button className="btn btn-disabled btn-accent btn-sm">Update</button>
                                }
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllParcel;