import { useState } from "react"

type SignupProps = {
    onSignupToggel: () => void
}

export function Signup({ onSignupToggel } : SignupProps){

    const [credentials, setCredentials] = 
        useState<{username: string, password: string}>({username: '', password: ''})

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) : void{
        const { target } = event
        setCredentials(prev=>({...prev, [target.name]: target.value}))
    }

    function onSignup(event: React.FormEvent<HTMLFormElement>) : void{
        event.preventDefault()
        console.log('Hey! you just Signed Up!')
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