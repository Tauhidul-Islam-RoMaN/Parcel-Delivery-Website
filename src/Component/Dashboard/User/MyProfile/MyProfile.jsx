import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const MyProfile = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-control w-full my-6">
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        className="file-input w-full max-w-xs" />
                </div>

                <button className="btn">Add items <FaUtensils className="ml-4"></FaUtensils> </button>
            </form>
        </div>
    );
};

export default MyProfile;