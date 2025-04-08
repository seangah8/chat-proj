import { useState } from "react"
import { userService } from "../../services/user.service.ts"

type LoginProps = {
    onSignupToggel: () => void,
    loadUser: () => Promise<void>
}

export function Login({ onSignupToggel, loadUser } : LoginProps){

    const [credentials, setCredentials] = 
        useState<{username: string, password: string}>({username: '', password: ''})

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) : void{
        const { target } = event
        setCredentials(prev=>({...prev, [target.name]: target.value}))
    }

    async function onLogin(event: React.FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault()
        const user = await userService.getByUsernameAndPassword(credentials)
        await userService.login(user)
        console.log('Hey! you just Logged In!')
        loadUser()
    }

    return(
        <section className="login">
            <h1>Login</h1>

            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onLogin(event)}>

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

                <button>Login</button>

            </form>

            <button onClick={onSignupToggel}>haven't signup yet?</button>

            
        </section>
    )
}