import { logout } from "../service/authService"
import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate()

    const handleLogout = async () => {

        await logout()

        navigate("/login")

    }

    return (

        <nav style={{ padding: 20, background: "#333", color: "#fff" }}>

            <button onClick={handleLogout}>
                Logout
            </button>

        </nav>

    )

}