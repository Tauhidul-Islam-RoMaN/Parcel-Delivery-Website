import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    // const [sortedUsers, setSortedUsers] =useState([])
    const [count, setCount] = useState("");
    // const axiosPublic =useAxiosPublic()

    // const role="user"
    // const [Users] = useUsers(role)
    // const [allUsers,refetch] = useAllUsers(currentPage,itemsPerPage,role)

    const axiosPublic =useAxiosPublic()
    const {data : sortedUsers=[], refetch} = useQuery({
        queryKey: ['sortedUsers'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/sortedUsersWithPage?page=${currentPage}&size=${itemsPerPage}`)
            return result.data
        }
    })
    // useEffect(() => {
    //     fetch(`http://localhost:5000/sortedUsersWithPage?page=${currentPage}&size=${itemsPerPage}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setSortedUsers(data)
    //     })
    // },[currentPage,itemsPerPage])

    console.log(sortedUsers);

    useEffect(() => {
        fetch('http://localhost:5000/usersCount')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCount(data.count)
            })
    }, [])
    
    useEffect(() => {
        refetch()
    }, [currentPage, itemsPerPage,refetch])

    const numberOfPages = Math.ceil(count / itemsPerPage)

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);
    console.log(count);
    console.log(numberOfPages);

    const handleItemsPerPage = e => {
        const userPage = parseInt(e.target.value);
        console.log(userPage);
        setItemsPerPage(userPage);
        setCurrentPage(1);
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }



    const handleAdmin = (user) => {
        const updatedRole = {
            role: "admin",
            name: user?.name,
            email: user?.email,
            number: user?.number
        }
        refetch()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert the role!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/users/${user._id}`, updatedRole)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `You made ${user.name} as an Admin`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }
    const handleDeliveryMan = (user) => {
        const updatedRole = {
            role: "delivery-man",
            name: user?.name,
            email: user?.email,
            number: user?.number
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert the role!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Delivery Man!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/users/${user._id}`, updatedRole)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `You made ${user.name} as an Admin`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
            .catch(err => console.log(err))

    }



    return (
        <>
        {/* table */}
            <div className="overflow-x-auto mt-10">
                <table className="table table-xs table-pin-cols">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>No. of Booking</th>
                            <th>Total Amount</th>
                            <th>Role</th>
                            <th>Make DeliveryMan</th>
                            <th>Make Admin</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedUsers?.map((user, index) => <tr className=""
                                key={user._id}
                            >
                                <th> {index + 1} </th>
                                <td>{user.name}</td>
                                <td> {user.number}</td>
                                <td>Total Booking</td>
                                <td>Total amount</td>
                                <td> {user.role}</td>
                                <td>
                                    {
                                        user?.role === "user" ? <button onClick={() => handleDeliveryMan(user)} className="btn btn-accent btn-sm">Make Delivery Man</button>
                                         : <button className="btn btn-accent btn-disabled btn-sm">Make Delivery Man</button>
                                    }
                                </td>
                                <td>
                                    {
                                        user?.role === "user" ? <button onClick={() => handleAdmin(user)} className="btn btn-accent btn-sm">Make Admin</button> : <button className="btn btn-accent btn-disabled btn-sm">Make Admin</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <h3 className="text-center flex items-center pb-10 pt-20 justify-center text-white gap-5 font-semibold text-xl">
                    <button className="btn btn-sm" onClick={handlePrevPage}>Prev</button>
                    {
                        pages.map(page => <button
                            className={currentPage === page + 1 ?
                                "btn btn-sm btn-accent" : "btn btn-sm"}
                            key={page+1}
                            onClick={() => setCurrentPage(page + 1)}
                        >{page + 1}

                        </button>)
                    }
                    <button className="btn btn-sm" onClick={handleNextPage}>Next</button>
                    <select value={itemsPerPage} className="bg-[#3bbcc0]" onChange={handleItemsPerPage} name="" id="">
                        <option value="3">3</option>
                        <option value="5" defaultValue={5}>5</option>
                        <option value="10" >10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </h3>
        </>
    );
};

export default AllUsers;