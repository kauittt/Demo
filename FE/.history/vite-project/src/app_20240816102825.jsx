import LoginPage from "./components/page/LoginPage";

export function App() {
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    return (
        <div className="flex flex-center mt-[50px]">
            <LoginPage></LoginPage>
        </div>
    );
}
