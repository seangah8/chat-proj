import { LoginSignup } from './LoginSignup.tsx'
import { userService } from "../../services/user"

type RegistrationProps = {
  isLoggedInUser: boolean,
  loadUser: () => Promise<void>
}

export function Registration({isLoggedInUser, loadUser} : RegistrationProps) {

  async function onLogout() : Promise<void>{
    await userService.logout()
    console.log("Hey! you just Logged Out!")
    loadUser()
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

  