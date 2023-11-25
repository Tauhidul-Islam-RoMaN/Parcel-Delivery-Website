import useAuth from "../../Hook/useAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleLogin } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate= useNavigate()
    const location = useLocation()

    const handleGoogleLogin = () => {
        googleLogin()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                name: res.user?.displayName || '',
                email: res.user?.email || '',
                role: "user"
            }
            console.log(userInfo);
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate(location?.state ? location?.state : '/')
            })
        })
        .catch(err => {
            console.log(err);
        })

    }
    return (
        <div>
            <div className="flex items-center justify-center mt-5 mb-10">
                <button onClick={handleGoogleLogin} className="btn w-4/5">
                    <FaGoogle className="mr-4"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;