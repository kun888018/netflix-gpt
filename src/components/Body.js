import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './LoginSignUpPage/Login'
import Browser from './Home/Browser'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase'
import { addUser, removeUser } from './../redux/userAuth/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browser',
            element: <Browser/>
        },
    ])

    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL: photoURL}));
            } else {
              dispatch(removeUser());
            }
        });
    }, []);

    return (

        <RouterProvider router={appRouter} />
    )
}

export default Body