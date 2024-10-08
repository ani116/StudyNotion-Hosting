import React from 'react'
import Template from '../components/core/Auth/Template'
import signupImage from "../assets/Images/signup.webp"



const Signup = () => {
  return (
    <div>
        <Template   title="Join the millions learning to code with StudyNotion for free"
                    description="Build skills for today, tomorrow, and beyond. Education to future-proof your career."
                    image={signupImage}
                    formType="signup"

        />
    </div>
  )
}

export default Signup
