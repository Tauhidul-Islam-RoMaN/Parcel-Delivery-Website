import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBookingAll = () => {
    const axiosPublic =useAxiosPublic()
    const {data : bookings=[], refetch: refetchBooking} = useQuery({
        queryKey: ['bookings'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/bookings`)
            return result.data
        }
    })
    return  [bookings, refetchBooking]
}


export default useBookingAll;