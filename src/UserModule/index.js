import React, { useState } from 'react'
import Login from './SignIn'
import SignUp from './SignUp'


function UserModule() {
    const [module, setModule] = useState('Login')
    return (
        <>
            {
                module == "Login" ?
                    <Login setModule={setModule} /> : 
                    false
                    // <SignUp setModule={setModule} />
            }
        </>
    )
}

export default UserModule