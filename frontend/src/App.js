import React from "react";
import { Box } from "@mui/material";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MakeBooking from "./components/bookings/MakeBooking";
import Register from "./components/users/Register.jsx";   
import DeleteUser from "./components/users/DeleteUser";
import AddRooms from "./components/AddRooms/AddRooms";
import Details from "./components/bookings/Details";
import Error from "./components/Error/Error";
import Help from "./components/Help/Help";
import Pending from "./components/PendingRequest/PendingRequestPage";
import SessionExpired from "./components/Error/SessionExpired";
import { useDispatch } from "react-redux";
import { logoutAction } from "./store/actions/users";
import NotAuthorized from "./components/Error/NotAuthorized";


function App() {
  const dispatcher = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/book/:x/:y",
      loader: async () => {
        const result = await fetch("https://lt-management-backend.onrender.com/api/rooms/", {
          method: "GET",
        });
        const ans = await result.json();
        if (ans.errors) {
          return ans.errors;
        }
        return ans.data;
      },
      element: <MakeBooking />,
      errorElement: <Error />,
    },
    {
      path: "/register/",
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: "/deleteUser",
      element: <DeleteUser />,
      errorElement: <Error />,
    },
    {
      path: "/addRooms",
      element: <AddRooms />,
      errorElement: <Error />,
    },
    {
      path:'/pending',
      element:<Pending/>,
      errorElement: <Error />
    },
    {
      path: "/help",
      element:<Help/>,
      errorElement: <Error />
    },
    {
      path: "/details/:id",
      loader: async ({ params }) => {
        const result = await fetch("https://lt-management-backend.onrender.com/api/rooms/", {
          method: "GET",
        });
        const ans = await result.json();
        if (ans.errors) {
          return ans.errors;
        }

        const result1 = await fetch(
          "https://lt-management-backend.onrender.com/api/bookings/details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
            },
            body: JSON.stringify({ bookId: params.id }),
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return { errors: res.status };
            }
          })
          .catch((err) => {
            console.log(err);
            return { errors: err };
          });

        if (result1.errors) {
          return result1;
        } else {
          return { ltData: ans.data, data: result1.data };
        }
      },
      element: <Details />,
      errorElement: <Error />,
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/sessionExpired",
      loader: async () => {
        dispatcher(logoutAction());
      },
      element: <SessionExpired />,
    },
    {
      path: "/notAuthorized",
      element: <NotAuthorized />,
      errorElement: <Error />,
    },
  ]);



  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <NavBar />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
