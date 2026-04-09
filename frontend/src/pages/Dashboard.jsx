import { useEffect, useState } from "react"
import axiosClient from "../api/axios"

export default function Dashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosClient.get("/auth/me")
                setData(res.data)
            } catch (err) {
                console.error("Error fetching dashboard:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>

            {data ? (
                <div>
                    <p><strong>User:</strong> {data.username}</p>
                    <p><strong>Role:</strong> {data.role}</p>
                </div>
            ) : (
                <p>No data</p>
            )}
        </div>
    )
}