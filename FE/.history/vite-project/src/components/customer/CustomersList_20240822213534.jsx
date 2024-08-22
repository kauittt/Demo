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
import { del, get, post, put } from "../../utils/httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "./../../elements/Button";
import { selectUser, userLogout } from "../../redux/slice/userSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function CustomersList() {
    //* Translation
    const { t, i18n } = useTranslation(["table", "common"]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [isHovering, setIsHovering] = useState(false);
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        dispatch(userLogout());
        const action = t("common:action.logout");
        toast.info(t("common:message", { type: action }), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const [customerList, setCustomerList] = useState([]);
    const [action, setAction] = useState("-1");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [updateCustomer, setUpdateCustomer] = useState(undefined);

    const dropdownRef = useRef(null);

    //! Check token
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

    const handleSaveCustomer = async (customer) => {
        // Tạo một deep copy của customer
        let tempCustomer = { ...customer };
        tempCustomer.contact = {
            id: customer.contact,
            name: "",
        };
        if (!updateCustomer) {
            try {
                const res = await post("/customers", tempCustomer);
                fetchData();
                const action = t("common:action.add");
                toast.info(t("common:message", { type: action }), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                closeModal();
            } catch (error) {
                console.log(error);
                // customer.contact = ;
                toast.error("ID already existed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            try {
                const res = await put("/customers", tempCustomer);
                fetchData();
                const action = t("common:update");
                toast.info(t("common:message", { type: action }), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                closeModal();
            } catch (error) {
                console.log(error);
                // customer.contact = originalCustomer.contact;
                alert("Error: " + error);
            }
        }
    };

    const handleDeleteCustomer = async (customer) => {
        try {
            const res = await del(`/customers/${customer.id}`); // Truyền ID qua URL
            setCustomerList(customerList.filter((c) => c.id !== customer.id));
            setAction("-1");
            const action = t("common:action.delete");
            toast.info(t("common:message", { type: action }), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
        <div className="h-screen bg-bgr p-[40px] overflow-hidden">
            <div
                className="w-full container mx-auto 
            flex flex-col gap-[30px]"
            >
                {/*//* Avatar  */}
                <div
                    className="relative transition-base
                 flex justify-end cursor-pointer"
                >
                    <div
                        className=" w-[200px] h-[50px] rounded-3xl 
                    bg-white shadow-custom
                     flex flex-center gap-[10px]
                     "
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            className="h-[35px] w-[35px]"
                            alt="Avatar"
                            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                        ></img>
                        <p className=" text-main font-semibold">{user?.name}</p>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className=" text-main"
                        ></FontAwesomeIcon>

                        {isHovering && (
                            <div
                                className="flex flex-col items-end justify-center gap-[10px]
                                absolute top-[50px] right-0
                                bg-bgr-white shadow-custom rounded-lg
                                text-base text-right bg-white
                                transition-base"
                            >
                                <Link
                                    to="/login"
                                    className=" w-full p-[12px] rounded hover:bg-hover hover:shadow-custom font-semibold
                                    transition-base"
                                    onClick={logout}
                                >
                                    {t("desc.logout")}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/*//* Search - Add Button  */}
                <div className="flex flex-center gap-[40px]">
                    {/* <div className="inline-flex flex-1 mx-20 items-center justify-center gap-10"> */}
                    <p className="text-main text-2xl font-semibold">
                        {t("desc.label")}
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
                            autoComplete="off"
                            id="search"
                            type="text"
                            placeholder={t("desc.placeholder")}
                            className="text-text flex-1
                            border-0 focus:border-none focus:outline-none"
                            onChange={(event) => {
                                const newValue = event.target.value;
                                setKeyword(newValue);
                            }}
                            value={keyword}
                        />
                    </label>
                    <Button
                        name={t("desc.button")}
                        onClick={() => {
                            setUpdateCustomer(undefined);
                            openModal();
                        }}
                        width="150px"
                    ></Button>
                </div>

                {/*//* Table  */}
                <div className="flex max-h-[389px] min-h-[389px]  rounded-xl mt-[20px]">
                    <table
                        className="rounded-xl shadow-custom h-1 bg-white table-fixed w-full"
                        style={{ tableLayout: "fixed" }}
                    >
                        <thead>
                            <tr>
                                <th className="p-3 w-[10%]">{t("table.1")}</th>
                                <th className="w-[30%]">{t("table.2")}</th>
                                <th className="w-[20%]">{t("table.3")}</th>
                                <th className="w-[20%]">{t("table.4")}</th>
                                <th className="w-[20%]">{t("table.5")}</th>
                                <th className="w-32">{t("table.6")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t-[1px] cursor-pointer border-border text-center break-words hover:bg-hover transition-base"
                                >
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.contact.name || ""}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button
                                            className="py-[15px] px-[20px]"
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
                                                className="absolute block bg-white rounded-xl font-semibold border-2 ml-7 mt-1 border-main"
                                            >
                                                <ul>
                                                    <li>
                                                        <button
                                                            onClick={() => {
                                                                console.log(
                                                                    item
                                                                );
                                                                setUpdateCustomer(
                                                                    item
                                                                );
                                                                openModal();
                                                            }}
                                                            className="hover:bg-hover w-[70px] p-2 rounded-xl"
                                                        >
                                                            {t("action.edit")}
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteCustomer(
                                                                    item
                                                                )
                                                            }
                                                            className="hover:bg-hover w-[70px] p-2 rounded-xl"
                                                        >
                                                            {t("button.delete")}
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
                <div className="justify-between inline-flex">
                    <div className="inline-flex items-center w-1/3 ">
                        <div className="m-8"></div>
                        <div className="border-b-2 px-3 border-main">
                            {totalPages}
                        </div>
                        <p className="mx-5 cursor-">{t("desc.info")}</p>
                    </div>
                    <div className="flex flex-center w-1/3">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="self-center text-main "
                            ></FontAwesomeIcon>
                        </button>
                        <button className="p-2 mx-1 text-xs font-semibold">
                            {currentPage == 1 ? (
                                <p className="text-bgr">1</p>
                            ) : (
                                currentPage - 1
                            )}
                        </button>
                        <div className="p-2 mx-3 bg-white font-semibold text-main">
                            {currentPage}
                        </div>
                        <button className="p-2 mx-1 text-xs font-semibold">
                            {currentPage == totalPages ? (
                                <p className="text-bgr">1</p>
                            ) : (
                                currentPage + 1
                            )}
                        </button>
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
                    <div className="w-1/3 "></div>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSaveCustomer={handleSaveCustomer}
                    customer={updateCustomer}
                ></Modal>
            </div>
        </div>
    );
}
