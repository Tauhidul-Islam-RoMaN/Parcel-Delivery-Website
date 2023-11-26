import { Link } from "react-router-dom";
import useBookingByEmail from "../../../Hook/useBookingByEmail";

const MyDeliveryList = () => {
    const [bookingsByEmail, refetch] =useBookingByEmail()
    console.log(bookingsByEmail);
    return (
        <div className="overflow-x-auto mt-10">
            <table className="table table-xs table-pin-cols">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Booked User Name</th>
                        <th>Receiver's Name</th>
                        <th>Booked User Phone</th>
                        <th>Req. Delivery Date</th>
                        <th>Approx Delivery Date</th>
                        <th>Receiver's Phone</th>
                        <th>Receiver's Address</th>
                        <th>View Location</th>
                        <th>Cancel</th>
                        <th>Deliver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         bookingsByEmail.map((booking, index) => <tr className=""
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
    );
};

export default MyDeliveryList;