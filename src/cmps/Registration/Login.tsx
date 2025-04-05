
type LoginProps = {
    onSignupToggel: () => void
}

export function Login({ onSignupToggel } : LoginProps){

    return(
        <section className="login">
            <h1>Login</h1>
            <button onClick={onSignupToggel}>haven't signup yet?</button>
        </section>
    )
}