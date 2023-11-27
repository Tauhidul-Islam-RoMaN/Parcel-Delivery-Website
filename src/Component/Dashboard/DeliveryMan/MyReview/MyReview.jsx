import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const MyReview = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/reviews?email=${user?.email}`)
            const data = await result.data
            return data
        }
    })
    console.log(reviews);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    reviews.map(review => <div
                        key={review.review}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="rounded-t-lg" src={review.userPhoto} alt="" />
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Reviewed By : {review.userName} </h5>
                            <p className="mb-3 font-semibold text-black "> Rating given on : <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">{review.reviewDate}</span> </p>
                            <p className="mb-3 font-semibold text-black "> Given Rating : <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">{review.rating} out of 5.0</span> </p>
                            <p className="mb-3 font-medium text-black"> Given Review : <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">{review.review}</span> </p>
                        </div>
                    </div>
                    )}
            </div>
        </>

    );
};

export default MyReview;