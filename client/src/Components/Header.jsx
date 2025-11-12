import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
  const {user}=useSelector((state)=>state.user);
  return (
    <div className='bg-blue-200'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <div className="font-bold text-2xl">Authentication Web</div>
            
                <ul className='flex gap-4'>
                   <Link to="/"><li>Home</li></Link> 
                   <Link to="/about"><li>About</li></Link> 
                   <Link to="/profile">{ user ? <img src={user.profilephoto} className="h-7 w-7 rounded-full object-cover" alt="profile" />: <li>Signin</li>}</Link> 

 
                </ul>
            
        </div>
    </div>
  )
}

export default Header
