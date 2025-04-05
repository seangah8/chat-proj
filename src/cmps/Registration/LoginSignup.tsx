import { Login } from "./Login.tsx"
import { Signup } from "./Signup.tsx"

import { useState } from "react"

export function LoginSignup(){

    const [onSignup, setOnSignup] = useState<boolean>(false)

    function onSignupToggel() : void{
        setOnSignup(prev=>!prev)
    }

    return(
        <section className="login-signup">
            {
                onSignup 
                ? <Signup
                    onSignupToggel={onSignupToggel}/>
                : <Login 
                    onSignupToggel={onSignupToggel}/>
            }
        </section>
    )
}