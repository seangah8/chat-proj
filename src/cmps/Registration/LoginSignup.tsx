import { Login } from "./Login.tsx"
import { Signup } from "./Signup.tsx"

import { useState } from "react"

type LoginSignupProps = {
    loadUser: () => Promise<void>
}

export function LoginSignup({loadUser} : LoginSignupProps){

    const [onSignup, setOnSignup] = useState<boolean>(false)

    function onSignupToggel() : void{
        setOnSignup(prev=>!prev)
    }

    return(
        <section className="login-signup">
            {
                onSignup 
                ? <Signup
                    onSignupToggel={onSignupToggel}
                    loadUser={loadUser}/>
                : <Login 
                    onSignupToggel={onSignupToggel}
                    loadUser={loadUser}/>
            }
        </section>
    )
}