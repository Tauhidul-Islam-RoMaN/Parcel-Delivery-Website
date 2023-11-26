import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMyDeliveries = () => {
    const axiosPublic =useAxiosPublic()
    const {user} =useAuth()
    console.log(user?.displayName);
    const {data : myDeliveries=[], refetch} = useQuery({
        queryKey: ['bookingsByEmail'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/deliveryMan`)
            return result.data
        }
    })
    return  [myDeliveries, refetch]
}


export default useMyDeliveries;