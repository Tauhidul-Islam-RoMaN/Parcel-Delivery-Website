import Banner from "../Banner/Banner";
import FeatureSwipper from "./FeatureSwipper";
import HomeStatistics from "./HomeStatistics";
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <FeatureSwipper></FeatureSwipper>
            <HomeStatistics></HomeStatistics>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;