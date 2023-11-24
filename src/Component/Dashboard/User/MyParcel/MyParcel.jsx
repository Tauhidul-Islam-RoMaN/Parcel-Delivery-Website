
const MyParcel = () => {
    return (
        // <div className="overflow-x-auto">
        //     <table className="table table-xs table-pin-rows table-pin-cols">
        //         {/* head */}
        //         <thead>
        //             <tr>
        //                 <th></th>
        //                 <th>Parcel Type</th>
        //                 <th>Requested Delivery Date</th>
        //                 <th>Approximate Delivery Date</th>
        //                 <th>Booking Date</th>
        //                 <th>Delivery Men ID</th>
        //                 <th>Booking Status</th>
        //                 <th>Update</th>
        //                 <th>Cancel</th>
        //                 <th>Review Button</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {/* row 1 */}
        //             <tr>
        //                 <th>1</th>
        //                 <td>Cy Ganderton</td>
        //                 <td>Quality Control Specialist</td>
        //                 <td>Blue</td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-xs table-pin-cols">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th>Booking Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Give Review</th>
                            <th>Pay Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
};

export default MyParcel;