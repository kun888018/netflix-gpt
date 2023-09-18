import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      navigate('/error');
    });
  }

  return (
    <div className=' flex justify-between items-center absolute w-screen px-8 py-2 bg-gradient-to-b from-black '>
      <div>
        <img className='w-44' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='login' />
      </div>

      {user && <div className='flex'>
        <img src={user?.photoURL} alt='User Pic'  className='rounded-md' />
        <button className=' bg-red-500 text-white p-4 ' onClick={handleSignOut}>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header