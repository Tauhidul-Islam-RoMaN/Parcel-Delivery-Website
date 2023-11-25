import { useCountUp } from 'react-countup';



const HomeStatistics = () => {
  useCountUp({ ref: 'Booked', end: 950, duration: 20, delay: 1 });
  useCountUp({ ref: 'Delivered', end: 750, duration: 20, delay: 1 });
  useCountUp({ ref: 'Users', end: 1000, duration: 20, delay: 1 });
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
