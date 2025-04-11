import { Registration } from './cmps/Registration/Registration.tsx'
import { Chat } from './cmps/Chat/Chat.tsx'
import { userService } from './services/user'
import { useState, useEffect } from 'react'
function App() {

  const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false)

  useEffect(()=>{
    loadUser()
  },[])

  async function loadUser() : Promise<void>{
    const user = await userService.getLoggedinUser()
    setIsLoggedInUser(user !== null)
  }

  return (
    <section className='app'>
      <Registration 
      isLoggedInUser={isLoggedInUser}
      loadUser={loadUser}/>
      <Chat isLoggedInUser={isLoggedInUser}/>
    </section>
  )
}

export default App
