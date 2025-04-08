import { useState } from "react"
import { userService } from "../../services/user.service.ts"

type SignupProps = {
    onSignupToggel: () => void,
    loadUser: () => Promise<void>
}

export function Signup({ onSignupToggel, loadUser } : SignupProps){

    const [credentials, setCredentials] = 
        useState<{username: string, password: string}>({username: '', password: ''})

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) : void{
        const { target } = event
        setCredentials(prev=>({...prev, [target.name]: target.value}))
    }

    // In TypeScript, every async function automatically returns a Promise
    // even if you're not explicitly returning anything.
    async function onSignup(event: React.FormEvent<HTMLFormElement>) : Promise<void>{
        event.preventDefault()
        const user = await userService.signup(credentials)
        await userService.login(user)
        console.log('Hey! you just Signed Up!')
        loadUser()
    }

    return(
        <section className="signup">
            <h1>Signup</h1> 

            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSignup(event)}>

                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}/>

                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}/>

                <button>SignUp</button>

            </form>
            

            <button onClick={onSignupToggel}>have account already?</button>
        </section>
    )
}