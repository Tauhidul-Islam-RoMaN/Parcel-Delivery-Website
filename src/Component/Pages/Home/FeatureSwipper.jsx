import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCards } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

const FeatureSwipper = () => {
    const [features, setFeatures] = useState()
    useEffect(() => {
        fetch('https://assignment-12-server-pied.vercel.app/features')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setFeatures(data)
            })
    }, [])
    

    return (
        <>
            <div className='bg-[#3bbcc0]'>
                <h2 className='font-bold text-3xl text-black text-center py-10'> --Why Us-- </h2>
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper max-w-[130px] md:max-w-md"
                >
                    {
                        features?.map(item => <SwiperSlide
                            key={item.name}
                        >
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <figure>
                                    <img className="rounded-t-lg" src={item.img} alt="" />
                                </figure>
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {item.description} </p>
                                </div>
                            </div>

                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </>
    );
};

export default FeatureSwipper;