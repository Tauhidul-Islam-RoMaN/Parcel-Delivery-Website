import { useEffect, useState } from 'react';
import { useCountUp } from 'react-countup';



const HomeStatistics = () => {

  const [users, setUsers] = useState([])
  const [booking, setBooking] = useState([])
  const [delivered, setDelivered] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data)
      })
  }, [])

  
  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBooking(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDelivered(data)
      })
  }, [])


  const totalUser = users.length
  const totalBooking = booking.length
  const totalDelivered = delivered.length
  console.log(totalBooking,totalUser);


  useCountUp({ ref: 'Users', end: totalUser, duration: 10, delay: 2 });
  useCountUp({ ref: 'Booked', end: totalBooking, duration: 10, delay: 2 });
  useCountUp({ ref: 'Delivered', end: totalDelivered, duration: 10, delay: 2 });

  // const axiosPublic =useAxiosPublic()
  // const {data : users, refetch ,isLoading} = useQuery({
  //     queryKey: ['users'],
  //     queryFn: async () =>{
  //         const result = await axiosPublic.get('/users')
  //         const data = await result.data
  //         return data
  //     }
  // })

  // const {data : bookings } = useQuery({
  //     queryKey: ['bookings'],
  //     queryFn: async () =>{
  //         const result = await axiosPublic.get('/bookings')
  //         const data = await result.data
  //         return data
  //     }
  // })
  // const {data : delivered } = useQuery({
  //     queryKey: ['booking'],
  //     queryFn: async () =>{
  //         const result = await axiosPublic.get('/bookings')
  //         const data = await result.data
  //         return data
  //     }
  // })
  // console.log(users,bookings,delivered);
 
  // refetch()

  // const totalUser = users?.length
  // const totalBooking = bookings?.length
  // const totalDelivered = delivered?.length
  // console.log(totalBooking,totalUser);


  // useCountUp({ ref: 'Users', end: totalUser,  duration: 10, delay: 0 });
  // useCountUp({ ref: 'Booked', end: totalBooking, duration: 10, delay: 0 });
  // useCountUp({ ref: 'Delivered', end: totalDelivered, duration: 10, delay: 0 });

  //   if (isLoading) {
  //   return <div className="flex justify-center items-center text-5xl"><span className="loading loading-spinner text-accent"></span></div>
  // }


  return (
    <div className='bg-[#3bbcc0] flex gap-10 flex-col lg:flex-row items-center justify-evenly py-10'>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Number of Parcel Booked </h5>
          <div className='text-center font-bold text-3xl' id="Booked"> </div>
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Number of Parcel Delivered </h5>
          <div className='text-center font-bold text-3xl' id="Delivered"> </div>

        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Number of Registered Users </h5>
          <div className='text-center font-bold text-3xl' id="Users"> </div>
        </div>
      </div>
    </div>
  );
};
export default HomeStatistics;
