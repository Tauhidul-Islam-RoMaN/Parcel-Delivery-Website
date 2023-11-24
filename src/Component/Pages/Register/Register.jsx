// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";


const Register = () => {
    const { createUser, profileUpdate } = useAuth()
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="mx-auto max-w-xl rounded-xl my-10 ">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-3xl font-xl text-center mt-10"> Register! </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" {...register("name", { required: true })} placeholder="name"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <input type="text" name="photo" {...register("photo", { required: true })} placeholder="Photo Url"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" />
                        {errors.photo && <span className="text-red-600">Photo Url is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" />
                        {errors.email && <span className="text-red-600">email is required</span>}

                    </div>
                    <div className="form-control">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">User Type*</span>
                        </label>
                        <select defaultValue="default" {...register("user-type", { required: true })} className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none">
                            <option disabled value="default">Select a category</option>
                            <option  value="user">User</option>
                            <option value="Delivery Man">Delivery Man</option>
                        </select>
                    </div>
                        {errors.email && <span className="text-red-600">email is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
                            // Minimum six characters, at least one letter, one number and one special character:
                        })} placeholder="password" required />
                        {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
                        {errors.password?.type === "minLength" && <span className="text-red-600">Password must be 6 characters</span>}
                        {errors.password?.type === "maxLength" && <span className="text-red-600">Password must be less than 20 characters</span>}
                        {errors.password?.type === "pattern" && <span className="text-red-600"> Password must have one letter, one number, one special character </span>}
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn" value="Register" />
                    </div>
                </form>
                <div>
                    <h2 className="text-lg text-center ">Already have an account? Please <Link to='/login'><span className="text-blue-600">Login</span></Link> </h2>
                </div>
                <div className="divider w-3/4 mx-auto">Social Login</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;