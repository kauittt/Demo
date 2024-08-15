import React from "react";

const CustomersList = () => {
    const [count, setCount] = useState(0);
    const [action, setAction] = useState("-1");
    const dropdownRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const array = [
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
        {
            id: "01231",
            name: "TEST",
            phone: "",
            contact: "",
            price: 10,
        },
    ];

    const handleAddCustomer = (newCustomer) => {
        console.log(newCustomer);
        setCustomers([...customers, newCustomer]); // Thêm khách hàng mới vào danh sách
        closeModal(); // Đóng modal sau khi thêm xong
    };
    const [customers, setCustomers] = useState(array);

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
                    <button
                        className="inline-flex px-4 h-[42px] items-center gap-4 bg-text rounded-xl"
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
                <table className="border-collapse border-spacing-4 divide-y spa divide-solid bg-white rounded-xl shadow-xl border-text flex-1 m-20 p-2">
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
                        {customers.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center p-3">{item.id}</td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.phone}</td>
                                <td className="text-center">{item.contact}</td>
                                <td className="text-center">{item.price}</td>
                                <td className="text-center w-32">
                                    <button onClick={() => setAction(index)}>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="self-center text-text"
                                        />
                                    </button>
                                    {action == index && (
                                        <div
                                            ref={dropdownRef}
                                            className="absolute block border-2 rounded-xl ml-7 mt-1 bg-white border-text"
                                        >
                                            <ul>
                                                <li>
                                                    <button className="hover:bg-main w-[70px] p-2 rounded-xl">
                                                        Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="hover:bg-main w-[70px] p-2 rounded-xl">
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
            <div className="inline-flex min-w-full justify-between ">
                <div className="inline-flex items-center w-1/3 ">
                    <div className="ml-20 mr-10">
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
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddCustomer={handleAddCustomer}
            ></Modal>
        </div>
    );
};

export default CustomersList;
