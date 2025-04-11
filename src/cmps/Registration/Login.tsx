import { useState } from "react"
import { userService } from "../../services/user"

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
        await userService.login(credentials)
        console.log('Hey! you just Logged In!')
        loadUser()
    }

    return(
        <section className="login">

            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onLogin(event)}>

                <input 
                    type="text" 
                    placeholder="Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}/>

                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}/>

                <button>Login</button>

            </form>

            <button className="swich-button" onClick={onSignupToggel}>haven't signup yet?</button>

            
        </section>
    )
}