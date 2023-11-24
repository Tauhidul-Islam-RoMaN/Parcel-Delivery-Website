import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
const BookAParcel = () => {

    const { user } = useAuth()

    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const today = new Date().toISOString().split("T")[0]

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="mx-auto max-w-xl rounded-xl ">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-3xl font-xl text-center mt-10"> Book Your Parcel </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" readOnly defaultValue={user?.displayName} {...register("name", { required: true })} placeholder="name"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" readOnly defaultValue={user?.email} {...register("email", { required: true })} placeholder="Email"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" name="phone"   {...register("phone", { required: true, maxLength:11, minLength:11 })} placeholder="01*********"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.phone && <span className="text-red-600">Please Provide valid Phone Number</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input type="text" name="type"   {...register("type", { required: true })} placeholder="Parcel Type"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.type && <span className="text-red-600">Parcel type is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Weight</span>
                        </label>
                        <select defaultValue="default" {...register("weight", { required: true })} className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none">
                            <option disabled value="default">Select a category</option>
                            <option value="1kg">1 Kg</option>
                            <option value="2kg">2 Kg</option>
                            <option value="more than 2kg"> More than 2 Kg</option>
                        </select>
                        {errors.weight && <span className="text-red-600">Parcel weight is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Phone Number</span>
                        </label>
                        <input type="number" name="receiversPhone"   {...register("receiversPhone", { required: true, maxLength:11, minLength:11 })} placeholder="01*********"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.receiversPhone && <span className="text-red-600">Please Provide valid Phone Number</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Delivery Address</span>
                        </label>
                        <input type="text" name="address"   {...register("address", { required: true })} placeholder="Parcel Delivery Address"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.address && <span className="text-red-600">Parcel delivery address is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input type="date" name="date"   {...register("date", { required: true })} min={today} placeholder="Delivery Date"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.date && <span className="text-red-600">Parcel delivery date is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input type="number" name="latitude"   {...register("latitude", { required: true })} placeholder="21.1213655476"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.latitude && <span className="text-red-600">Delivery address latitude is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input type="number" name="longitude"   {...register("longitude", { required: true })} placeholder="21.1213655476"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.longitude && <span className="text-red-600">Delivery address longitude is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" name="price"   {...register("price", { required: true })} placeholder="Price"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn" value="Book" />
                    </div>
                </form>
            </div>
        </div>
    );
};


export default BookAParcel;