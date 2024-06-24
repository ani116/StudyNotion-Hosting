import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImage from "../assets/Images/login.webp"


const Login = () => {
  return (
    <div className=''>

        <Template   title="Welcome Back"
                    description="Build skills for today, tomorrow, and beyond. Education to future-proof your career."
                    image={loginImage}
                    formType="login"            
        />

    </div>
  )
}

export default Login
