import { LoginSignup } from './LoginSignup.tsx'
import { userService } from "../../services/user.service.ts"

import { useState, useEffect } from "react"

export function Registration() {

  const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false)

  useEffect(()=>{
    loadUser()
  },[])

  async function loadUser() : Promise<void>{
    const user = await userService.getLoggedinUser()
    setIsLoggedInUser(user !== null)
  }

  async function onLogout() : Promise<void>{
    await userService.logout()
    console.log("Hey! you just Logged Out!")
    setIsLoggedInUser(false)
  }


  return (
    <section className='registration'>
      {
        isLoggedInUser
        ? <button onClick={onLogout}>Logout</button>
        : <LoginSignup loadUser={loadUser}/>
      }
      
    </section>
  )
}

  