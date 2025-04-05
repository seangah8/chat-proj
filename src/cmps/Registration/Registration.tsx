import { LoginSignup } from './LoginSignup.tsx'
import { useState } from "react"

export function Registration() {

    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false)


    return (
      <section className='registration'>
        {
          isLoggedInUser
          ? <button>Logout</button>
          : <LoginSignup/>
        }
        
      </section>
    )
  }

  