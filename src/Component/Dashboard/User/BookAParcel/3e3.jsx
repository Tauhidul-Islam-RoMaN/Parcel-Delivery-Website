<>




    <select
        defaultValue="default"
        className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
    >
        <option disabled value="default">Select a delivery man</option>
        {deliveryMan.map((man) => (
            <option key={man.email} value={man.name}>
                {man.name}
            </option>
        ))}
    </select>
    <form>
        <label className="label">
            <span className="label-text text-center font-bold text-3xl -mt-10">Assign Delivery Man</span>
        </label>
        <select defaultValue="default" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" onChange={handleChange} name="" id="">
            <option disabled value="default" >Select a delivery man</option>
            {deliveryMan.map((man) => (
                <option key={man.email} value={man.name}>
                    {man.name}
                </option>
            ))}
        </select>
    </form>


</>