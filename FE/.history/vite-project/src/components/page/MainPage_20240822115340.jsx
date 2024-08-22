import { Outlet } from "react-router-dom";
import Languages from "../languages/Languages";

const MainPage = () => {
    return (
        <>
            <Languages />
            <Outlet />
        </>
    );
};
export default MainPage;
