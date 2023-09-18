import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../CommonComponents/Header'
import { CheckValidSignInFormData, CheckValidSignUPFormData } from './../../utils/SignInSignUpFormValidation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './../../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/userAuth/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, seterrorMessage] = useState(true);


    const toggleSignUpForm = () => {
        setIsSignIn(!isSignIn);
    }

    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handaleSubmoitForm = () =>{
        const SignInFromValidationMsg = isSignIn ? CheckValidSignInFormData(email?.current?.value, password?.current?.value) : CheckValidSignUPFormData(fullName?.current?.value , email?.current?.value, password?.current?.value);
        seterrorMessage(SignInFromValidationMsg);
        // sourcery skip: use-braces
        if (SignInFromValidationMsg) {
          return;
        }

        if(!isSignIn){
            createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: fullName?.current?.value, photoURL: "https://lh3.googleusercontent.com/ogw/AGvuzYb870EE8fVPtuPeeOYfc_TTM_dF7i-j2MWRL48PNA=s32-c-mo"
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL: photoURL}));
                    navigate('/browser');
                  }).catch((error) => {
                    seterrorMessage(error.message);
                });
                // console.log(user);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrorMessage(errorCode + "-" + errorMessage);
            });
        }else{
            signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate('/browser');
            })
            .catch((error) => {
                const errorCode = error.code;
                seterrorMessage(errorCode + "-" + errorMessage);
            });
        }
        
    }

    return (
        <div className=' relative'>
            <Header />
            <div>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt='bg' />
            </div>
            <div className=' absolute flex justify-center items-baseline top-20 left-0 right-0 bottom-0 h-screen'>
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col bg-black bg-opacity-75 p-16 text-white w-1/2 max-w-md'>
                    <h1 className='font-bold text-3xl mb-6 mt-0'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
                    {!isSignIn &&
                        <>
                            <input ref={fullName} type='text' placeholder='Enter Your Full Name' className='flex-1 p-4 my-4 rounded-md border-gray-950 bg-gray-950' />
                            {/* <input type='password' placeholder='Enter Your Password' className='flex-1 p-4 my-4 rounded-md border-gray-950 bg-gray-950' /> */}
                        </>
                    }
                        <input ref={email} type='text' placeholder='Enter Your Email' className='flex-1 p-4 my-4 rounded-md border-gray-950 bg-gray-950' />
                        <input ref={password} type='password' placeholder='Enter Your Password' className='flex-1 p-4 my-4 rounded-md border-gray-950 bg-gray-950' />
                    <p className=' text-red-600 font-bold text-lg pb-3'>{errorMessage}</p> 
                    <button className='flex-1 bg-red-700 p-4 my-4 rounded-md ' onClick={handaleSubmoitForm}>{isSignIn ? "Sign In" : "Sign Up"}</button>
                    <p onClick={toggleSignUpForm} className='cursor-pointer'>{isSignIn ? "New to Netflix ? Sign Up Now" : "Allready A Member ? Sign In Now"}</p>
                </form>
            </div>
        </div>
    )
}

export default Login