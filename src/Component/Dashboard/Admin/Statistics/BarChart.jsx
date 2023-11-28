import ApexCharts from 'react-apexcharts';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const BarChart = () => {
  const axiosPublic = useAxiosPublic()
  const { data: bookingsByDate = [], refetch } = useQuery({
    queryKey: ['sortedUsers'],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bookingsForChart`)
      return result.data
    }
  })
  console.log(bookingsByDate);
  const categories = bookingsByDate.map(item => item._id)
  const seriesData = bookingsByDate.map((item) => item.bookingCount)

  const series = [{ name: 'Bookings By Date', data: seriesData }];
  console.log(series);
  console.log(categories, series);

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: categories.map(dateString => {
        const date = new Date(dateString);
        refetch()
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }),
    }
  }

    return(
    <div>
    <ApexCharts options={chartOptions} series={series} type="bar" height={350} />
    </div >
  );
};

export default BarChart;
