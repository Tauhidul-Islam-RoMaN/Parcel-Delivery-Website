import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = (role) => {
    const axiosPublic =useAxiosPublic()
    const {data : Users=[], refetch} = useQuery({
        queryKey: ['Users'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/users?role=${role}`)
            console.log(result.data);
            return result.data
        }
    })
    
    return  [Users, refetch]

}


export default useUsers;