import LoginPage from "./components/page/LoginPage";

export function App() {
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    // 1536 - 703
    // 1920 - 1024
    // 0.8 - 0.7
    return (
        <div className="flex flex-center mt-[50px]">
            <LoginPage></LoginPage>
        </div>
    );
}
