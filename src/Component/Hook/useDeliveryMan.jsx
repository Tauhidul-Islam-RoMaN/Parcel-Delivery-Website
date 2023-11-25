import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDeliveryMan = () => {
    const axiosPublic =useAxiosPublic()
    const {data : deliveryMan=[], refetch} = useQuery({
        queryKey: ['deliveryMan'],
        queryFn: async () =>{
            const result = await axiosPublic.get("/users?role=delivery-man")
            return result.data
        }
    })
    return  [deliveryMan, refetch]
}


export default useDeliveryMan;