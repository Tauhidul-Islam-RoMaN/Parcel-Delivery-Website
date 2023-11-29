import { useForm } from "react-hook-form";
import { FaUsers } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { register, reset, handleSubmit } = useForm()
    const { user, setLoading,  profileUpdate } = useAuth()
    const axiosPublic = useAxiosPublic()

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(image_hoisting_api, imageFile, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
            if (res.data.success) {
                profileUpdate(user?.displayName, res.data?.data?.display_url)
                    .then(() => {
                        console.log("photo updated");
                        reset()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Photo updated Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setLoading(false)
                    })
            }
        }
        catch (error) {
            console.error("Error updating photo:", error);
        }
    }
    return (
        <div>
            <div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src={user?.photoURL} alt="" />
                    </a>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Welcome, {user?.displayName}</h5>
                        <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white"> {user?.email}</h5>
                        <p className="font-bold ">Want to update your profile photo? Upload your photo</p>
                    </div>
                </div>

            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-control w-full my-6">
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        className="file-input w-full max-w-xs" />
                </div>
                <button className="btn">Update Photo <FaUsers className="ml-4"></FaUsers> </button>
            </form>
        </div>
    );
};

export default MyProfile;