import { useState } from "preact/hooks";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faSearch,
    faPlus,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

export function App() {
    const [count, setCount] = useState(0);

    const array = [
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
        {
            checked: true,
            time: "7:00-7:30",
            patient: "Brahs Mariam Roh",
            insurance: "Macai",
            test: "Upper Abdomen General - Test Code 2705",
            technicain: ",Vateia",
            location: "Hagana 16, Tel Aviv",
            creator: "",
            status: "Visited",
            Timer: "",
        },
    ];

    return (
        <div className="w-screen h-screen bg-main">
            <div className="flex justify-end">
                <div className="w-[220px] m-10 mx-20 h-[77px] flex rounded-3xl bg-white shadow-lg">
                    <div className="w-[182px] h-[45px] justify-center flex m-auto gap-2">
                        <img className="h-[45px] w-[45px]"></img>
                        <p className="text-base self-center text-text">
                            Carter smith
                        </p>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="self-center text-text"
                        ></FontAwesomeIcon>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="inline-flex flex-1 mx-20 items-center justify-center gap-10">
                    <p className="text-text text-2xl">Customers</p>
                    <div className="bg-white flex-1 h-[42px] rounded-xl border-text border-2 items-center px-16 gap-10 flex">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="self-center text-text"
                        ></FontAwesomeIcon>
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="placeholder-text flex-1"
                        />
                    </div>
                    <button className="inline-flex px-4 h-[42px] items-center gap-4 bg-text rounded-xl">
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="self-center text-white"
                        ></FontAwesomeIcon>
                        <p className="text-white">New Customer</p>
                    </button>
                </div>
            </div>
            <div className="flex min-w-full">
                <table className="border-collapse border-spacing-4 divide-y spa divide-solid bg-white rounded-xl shadow-xl border-text flex-1 m-20 p-2">
                    <tr className="">
                        <th className="p-3">
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Insurance</th>
                        <th>Test</th>
                        <th>Technician</th>
                        <th>Location</th>
                        <th>Creator</th>
                        <th>Status</th>
                        <th>Timer</th>
                        <th>Actions</th>
                    </tr>
                    {array.map((item, index) => (
                        <tr className="" key={index}>
                            <td className="text-center p-3">
                                <input type="checkbox" className="" id="" />
                            </td>
                            <td className="text-center">{item.time}</td>
                            <td className="text-center">{item.patient}</td>
                            <td className="text-center">{item.insurance}</td>
                            <td className="text-center">{item.test}</td>
                            <td className="text-center">{item.technicain}</td>
                            <td className="text-center">{item.location}</td>
                            <td className="text-center">{item.creator}</td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">{item.Timer}</td>
                            <td className="text-center">
                                <button>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="self-center text-text"
                                    ></FontAwesomeIcon>
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="inline-flex min-w-full justify-between ">
                <div className="inline-flex items-center w-1/3 ">
                    <div className="mx-20">
                        <div className=" rounded-lg px-3 p-2 shadow-xl">
                            <FontAwesomeIcon
                                icon={faCog}
                                className="self-center text-text"
                            ></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="border-b-2 px-3 border-text">10</div>
                    <p className="mx-5">Show on page</p>
                </div>
                <div className="inline-flex w-1/3 justify-center items-center">
                    <p>Page</p>
                    <div className="px-3 p-2 bg-white mx-20">10</div>
                </div>
                <div className="w-1/3"></div>
            </div>
        </div>
    );
}
