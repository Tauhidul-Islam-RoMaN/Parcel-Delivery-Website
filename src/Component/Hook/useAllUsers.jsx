import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllUsers = (currentPage,itemsPerPage) => {
    const axiosPublic =useAxiosPublic()
    const {data : allUsers=[], refetch} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/users?page=${currentPage}&size=${itemsPerPage}`)
            console.log(result.data);
            return result.data
        }
    })
    
    return  [allUsers, refetch]

}


export default useAllUsers;