import { Parallax } from 'react-parallax';
import img from '../../../assets/Banner.png'

const Banner = () => {

    return (
        <Parallax
            blur={{ min: -50, max: 30 }}
            bgImage={img}
            bgImageAlt="Banner"
            strength={-200}
        >
            <div className="lg:h-[850px] text-white text-center md:h-[432px]  grid h-[240px] bg-contain lg:bg-cover bg-no-repeat">
                <div className="col-start-1 row-start-1 bg-black bg-opacity-60 w-full h-full"></div>
                <div className="col-start-1 flex items-center justify-center row-start-1 mx-auto">
                    <div className="flex-1">

                    </div>
                    <div className="flex-1 ">
                        <h2 className="lg:text-5xl md:text-4xl text-lg mb-2 md:mb-6 ">ShipSwiftly <br /> Where Your Packages Find the Fast Lane to Their Destination!</h2>
                        <div className="w-4/5 mx-auto flex gap-0">
                            <input type="search" name="name" className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none" placeholder="Search your Parcel" required />
                        </div>
                    </div>
                </div>

            </div>
        </Parallax>
    );
};

export default Banner;