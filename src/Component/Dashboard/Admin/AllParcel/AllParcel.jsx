// import { Link } from "react-router-dom";
import useBookingAll from "../../../Hook/useBookingAll";
import { useEffect, useRef, useState } from "react";
import useDeliveryMan from "../../../Hook/useDeliveryMan";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const AllParcel = () => {
    const [bookings, refetchBooking] = useBookingAll()
    const [deliveryMan, refetch] = useDeliveryMan()
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [sortedData, setSortedBooking] =useState([])
    const [assignedDeliveryMan, setAssignedDeliveryMan] = useState()
    const today = new Date().toISOString().split("T")[0];
    const axiosPublic = useAxiosPublic()
    const bookingRef = useRef(null);

    const handleManage = (booking) => {
        setSelectedBooking(booking);
        bookingRef.current = booking
    };
    useEffect(() => {
        if (selectedBooking) {
            document.getElementById('my_modal_5').showModal();
            refetch()
            refetchBooking()
        }
    }, [refetch, refetchBooking, selectedBooking]);
    console.log(sortedData);


    const handleChange = (e) => {
        e.preventDefault()
        const assigned = e.target.value
        setAssignedDeliveryMan(assigned)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const assignedMan = assignedDeliveryMan
        const departureDate = e.target.departureDate.value
        const dmId = e.target.dmId.value
        console.log(assignedMan, departureDate, dmId);
        console.log(bookingRef.current)
        const updatedInfo = {
            address: bookingRef.current?.address,
            deliveryDate: bookingRef.current?.deliveryDate,
            bookingDate: bookingRef.current?.bookingDate,
            latitude: bookingRef.current?.latitude,
            longitude: bookingRef.current?.longitude,
            phone: bookingRef.current?.phone,
            price: bookingRef.current?.price,
            receiversName: bookingRef.current?.receiversName,
            receiversPhone: bookingRef.current?.receiversPhone,
            type: bookingRef.current?.type,
            weight: bookingRef.current?.weight,
            departureDate: departureDate,
            dmId: dmId,
            status: 'on-the-way',
            assignedMan: assignedMan
        }
        axiosPublic.patch(`/bookings/${bookingRef.current?._id}`, updatedInfo)
            .then(res => {
                console.log('booking updated', res.data);
                if (res.data.modifiedCount > 0) {
                    refetchBooking()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "DeliveryMan Assigned Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => console.log(err))

    };

    const handleSort = (e) => {
        e.preventDefault()
        const startDate = e.target.startDate.value
        const endDate = e.target.endDate.value
        console.log(startDate,endDate);
        console.log(typeof(startDate,endDate));

        axiosPublic.get(`/bookings?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            setSortedBooking(data)
          })
          .catch(error => {
            console.error(error);
          });
    }

    return (
        <>

            <div className="form-control flex justify-end -my-10 items-end">
                <form onSubmit={handleSort} className="card-body">
                    <div className="flex items-center gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">From</span>
                            </label>
                            <input type="date" name="startDate" placeholder="Expected Delivery Date"
                                className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">To</span>
                            </label>
                            <input type="date" name="endDate" placeholder="Expected Delivery Date"
                                className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-accent">Search</button>
                        </div>
                    </div>
                </form>
            </div>

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
                            (sortedData.length > 0 ? sortedData : bookings).map((booking, index) => <tr className=""
                                key={booking._id}
                            >
                                <th> {index + 1} </th>
                                <td>{booking.name}</td>
                                <td>Number</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.deliveryDate}</td>
                                <td>{booking.price}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status === "pending" ? <button className="btn btn-accent" onClick={() => handleManage(booking)}> Manage </button> : <button className="btn btn-disabled" > Manage </button>}
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            {selectedBooking && (
                                                <div className="flex  gap-10">
                                                    <div className="font-semibold text-lg">
                                                        <p>Booked By : {selectedBooking.name}</p>
                                                        <p>Booking Date: {selectedBooking.bookingDate}</p>
                                                        <p>Expected Delivery Date: {selectedBooking.deliveryDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="py-4">Press ESC key to close</p>
                                                    </div>
                                                </div>

                                            )}
                                            <div className="modal-action">
                                                <form onSubmit={handleSubmit} className="card-body">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-center font-bold text-3xl -mt-10">Assign Delivery Man</span>
                                                        </label>
                                                        <select onChange={handleChange}
                                                            defaultValue="default"
                                                            name="assignedMan" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                                                            id="">
                                                            <option  value="default" >Select a delivery man</option>
                                                            {deliveryMan.map((man) => (
                                                                <option key={man.email} value={man.name}>
                                                                    {man.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Expected Delivery Date</span>
                                                        </label>
                                                        <input type="date" name="departureDate" min={today} placeholder="Expected Delivery Date"
                                                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Delivery Man Id</span>
                                                        </label>
                                                        <input type="text" name="dmId" placeholder="DM-0000"
                                                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="form-control mt-6">
                                                        <button className="btn btn-accent">Assign</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllParcel;