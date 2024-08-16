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
import Button from "./../../elements/Button";

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
        <div className=" bg-bgr p-[40px]">
            <div
                className="w-full container mx-auto 
            flex flex-col gap-[30px]"
            >
                {/*//* Avatar  */}
                <div className="flex justify-end cursor-pointer">
                    <div
                        className="w-[200px] h-[50px] rounded-3xl 
                    bg-white shadow-custom
                     flex flex-center gap-[10px]"
                    >
                        <img
                            className="h-[35px] w-[35px]"
                            alt="Avatar"
                            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                        ></img>
                        {/*//! Name  */}
                        <p className=" text-main font-semibold">Carter Smith</p>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className=" text-main"
                        ></FontAwesomeIcon>
                    </div>
                </div>

                {/*//* Search - Add Button  */}
                <div className="flex flex-center gap-[40px]">
                    {/* <div className="inline-flex flex-1 mx-20 items-center justify-center gap-10"> */}
                    <p className="text-main text-2xl font-semibold">
                        Customers
                    </p>

                    {/*//* Search  */}
                    <label
                        htmlFor="search"
                        className="flex-1 flex flex-center 
                    bg-white border-main border-2 h-[42px] 
                    rounded-xl px-16 gap-10 cursor-pointer"
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="self-center text-main"
                        ></FontAwesomeIcon>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search customers..."
                            className="text-text flex-1
                            border-0 focus:border-none focus:outline-none"
                            onChange={(event) => {
                                const newValue = event.target.value;
                                setKeyword(newValue);
                            }}
                            value={keyword}
                        />
                    </label>
                    {/* <div
                        className="flex-1 flex flex-center 
                    bg-white border-main border-2 h-[42px] rounded-xl  px-16 gap-10 "
                    ></div> */}

                    {/* <button
                        className="inline-flex px-4 h-[42px] items-center gap-4 bg-main rounded-xl"
                        onClick={openModal}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="self-center text-white"
                        ></FontAwesomeIcon>
                        <p className="text-white">New Customer</p>
                    </button> */}
                    {/*//* Button  */}
                    <Button
                        name="New Customer"
                        onClick={openModal}
                        width="150px"
                    ></Button>
                    {/* </div> */}
                </div>

                {/*//* Table  */}
                <div className="flex ">
                    <table className="rounded-xl shadow-custom flex-1 bg-white">
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
                                <tr
                                    key={index}
                                    className="border-t-[1px] cursor-pointer 
                                    border-border  hover:bg-hover
                                    transition-base"
                                >
                                    <td className="text-center p-3">
                                        {item.id}
                                    </td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                        {item.phone}
                                    </td>
                                    <td className="text-center">
                                        {item.contact ? item.contact : ""}
                                    </td>
                                    <td className="text-center">
                                        {item.price}
                                    </td>
                                    <td className="text-center w-32">
                                        <button
                                            className=""
                                            onClick={() => setAction(index)}
                                        >
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

                {/*//* Footer  */}
                {/* <div className="inline-flex min-w-full justify-between absolute bottom-28">
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
                        <div className="px-3 p-2 bg-white mx-10">
                            {currentPage}
                        </div>
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
                </div> */}

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddCustomer={handleAddCustomer}
                ></Modal>
            </div>
        </div>
    );
}
