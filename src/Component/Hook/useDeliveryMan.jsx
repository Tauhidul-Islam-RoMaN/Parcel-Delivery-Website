import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDeliveryMan = (role="delivery-man") => {
    const axiosPublic =useAxiosPublic()
    const {data : deliveryMan=[], refetch} = useQuery({
        queryKey: ['deliveryMan'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/users?role=${role}`)
            console.log(result.data);
            return result.data
        }
    })
    
    return  [deliveryMan, refetch]

}


export default useDeliveryMan;