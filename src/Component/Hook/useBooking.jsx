import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useBooking = () => {
    const axiosPublic =useAxiosPublic()
    const {user} =useAuth()
    const {data : bookings=[], refetch} = useQuery({
        queryKey: ['bookings'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/bookings?email=${user?.email}`)
            return result.data
        }
    })
    return  [bookings, refetch]
}


export default useBooking;