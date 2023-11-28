import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const AllDeliveryMan = () => {
    
    const axiosPublic =useAxiosPublic()
    const {data : deliveryMan=[], refetch} = useQuery({
        queryKey: ['deliveryMan'],
        queryFn: async () =>{
            const data = await axiosPublic.get('/sortedDeliveryMan')
            return (data.data)
        }
    })
    console.log(deliveryMan);
    



    


    return (
        <div className="overflow-x-auto mt-10">
            <table className="table table-xs table-pin-cols">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Delivery Man's Name</th>
                        <th>Phone Number</th>
                        <th>Number of Parcel Delivered</th>
                        <th>Average review</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        deliveryMan?.map((man, index) => <tr className=""
                            key={man._id}
                        >
                            <th> {index + 1} </th>
                            <td>{man.name}</td>
                            <td> {man.number}</td>
                            <td>Number of Parcel Delivered</td>
                            <td>Average Rating</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMan;