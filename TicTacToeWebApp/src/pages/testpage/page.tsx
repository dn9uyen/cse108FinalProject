import { useNavigate } from "react-router-dom";

const Page = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch("/logout")
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            console.error("Failed to logout", error);
        });
    };

    return (
        <div>
            <h1>Test Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Page;
