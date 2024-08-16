import { useEffect, useRef, useState } from "preact/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faSearch,
    faPlus,
    faCog,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../modals/ModalCustomer";
import { del, get, post } from "../../utils/httpRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CustomersList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customerList, setCustomerList] = useState([]);
    const [action, setAction] = useState("-1");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const dropdownRef = useRef(null);

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        if (!accessToken) {
            navigate("/login");
        }
    }, [navigate]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    async function fetchData() {
        let responseCustomer = await get("/customers");
        setCustomerList(responseCustomer);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setAction(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const searchCustomer = async () => {
            if (keyword.trim() !== "") {
                try {
                    const response = await get("/customers/search", {
                        params: { keyword },
                    });
                    setCustomerList(response);
                } catch (error) {
                    console.log("Error searching:", error);
                }
            } else fetchData();
        };
        searchCustomer();
    }, [keyword]);

    const handleAddCustomer = async (newCustomer) => {
        try {
            const res = await post("/customers", newCustomer);
            setCustomerList([...customerList, res]);
            closeModal();
        } catch (error) {
            console.log(error);
            alert("Id has exist: " + error);
        }
    };

    const handleDeleteCustomer = async (customer) => {
        try {
            const res = await del(`/customers/${customer.id}`); // Truyền ID qua URL
            setCustomerList(customerList.filter((c) => c.id !== customer.id));
            setAction("-1");
        } catch (error) {
            console.error(error);
            alert(
                "Failed to delete customer: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customerList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(customerList.length / itemsPerPage);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="w-screen h-screen bg-bgr">
            <div className="flex justify-end">
                <div className="w-[220px] m-10 mx-20 h-[77px] flex rounded-3xl bg-white shadow-lg">
                    <div className="w-[182px] h-[45px] justify-center flex m-auto gap-2">
                        <img className="h-[45px] w-[45px]" alt=""></img>
                        <p className="text-base self-center text-main">
                            Carter Smith
                        </p>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="self-center text-main"
                        ></FontAwesomeIcon>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="inline-flex flex-1 mx-20 items-center justify-center gap-10">
                    <p className="text-main text-2xl">Customers</p>
                    <div className="bg-white flex-1 h-[42px] rounded-xl border-main border-2 items-center px-16 gap-10 flex">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="self-center text-main"
                        ></FontAwesomeIcon>
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="placeholder-main flex-1"
                            onChange={(event) => {
                                const newValue = event.target.value;
                                setKeyword(newValue);
                            }}
                            value={keyword}
                        />
                    </div>
                    <button
                        className="inline-flex px-4 h-[42px] items-center gap-4 bg-main rounded-xl"
                        onClick={openModal}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="self-center text-white"
                        ></FontAwesomeIcon>
                        <p className="text-white">New Customer</p>
                    </button>
                </div>
            </div>
            <div className="flex min-w-full">
                <table className="border-collapse border-spacing-4 divide-y spa divide-solid bg-white rounded-xl shadow-xl border-main flex-1 m-20 p-2">
                    <thead>
                        <tr>
                            <th className="p-3">No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Contact</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center p-3">{item.id}</td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.phone}</td>
                                <td className="text-center">
                                    {item.contact ? item.contact : ""}
                                </td>
                                <td className="text-center">{item.price}</td>
                                <td className="text-center w-32">
                                    <button onClick={() => setAction(index)}>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="self-center text-main"
                                        />
                                    </button>
                                    {action === index && (
                                        <div
                                            ref={dropdownRef}
                                            className="absolute block border-2 rounded-xl ml-7 mt-1 bg-white border-main"
                                        >
                                            <ul>
                                                <li>
                                                    <button className="hover:bg-bgr w-[70px] p-2 rounded-xl">
                                                        Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteCustomer(
                                                                item
                                                            )
                                                        }
                                                        className="hover:bg-bgr w-[70px] p-2 rounded-xl"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="inline-flex min-w-full justify-between absolute bottom-28">
                <div className="inline-flex items-center w-1/3 ">
                    <div className="ml-20 mr-10">
                        <div className=" rounded-lg px-3 p-2 shadow-xl bg-white">
                            <FontAwesomeIcon
                                icon={faCog}
                                className="self-center text-main"
                            ></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="border-b-2 px-3 border-main">
                        {totalPages}
                    </div>
                    <p className="mx-5">Show on page</p>
                </div>
                <div className="inline-flex w-1/3 justify-center items-center">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="self-center text-main "
                        ></FontAwesomeIcon>
                    </button>
                    <div className="px-3 p-2 bg-white mx-10">{currentPage}</div>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="self-center text-main"
                        ></FontAwesomeIcon>
                    </button>
                </div>
                <div className="w-1/3"></div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddCustomer={handleAddCustomer}
            ></Modal>
        </div>
    );
}
