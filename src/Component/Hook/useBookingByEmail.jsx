import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useBookingByEmail = () => {
    const axiosPublic =useAxiosPublic()
    const {user} =useAuth()
    console.log(user?.displayName);
    const {data : bookingsByEmail=[], refetch} = useQuery({
        queryKey: ['bookingsByEmail'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/bookings?assignedMan=${user?.displayName}`)
            return result.data
        }
    })
    return  [bookingsByEmail, refetch]
}


export default useBookingByEmail;