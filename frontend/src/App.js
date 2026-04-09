// //App.js
// import { useEffect, useState } from "react";

// function App() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/users")
//       .then(res => res.json())
//       .then(data => setUsers(data));
//   }, []);

//   return (
//     <div>
//       <h1>User List</h1>
//       {users.map(user => (
//         <p key={user.id}>{user.name}</p>
//       ))}
//     </div>
//   );
// }

// export default App;

// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import Home from "./pages/Home"
import { AuthProvider } from "./context/AuthContext"
import RoleRoute from "./routes/RoleRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RoleRoute role="admin">
                <Dashboard />
              </RoleRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App