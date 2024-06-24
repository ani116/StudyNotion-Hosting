import React, { useEffect, useState } from 'react'
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import foundingImage from "../assets/Images/FoundingStory.png"
import { useForm } from 'react-hook-form'
import { apiConnector } from '../services/apiconnector'
import { contactUsEndPoint } from '../services/apis'
import Footer from '../components/common/Footer'


const About = () => {

  const [loading, setLoading] = useState(false)

  const {CONTACTUS_API} = contactUsEndPoint

  const {
          register,
          reset,
          handleSubmit,
          formState: {errors, isSubmitSuccessful}
  } = useForm()

  const submitContactForm = async(data) => {
      console.log("Fetching DAta", data)
      setLoading(false)
      try {
        const response = await apiConnector("POST", CONTACTUS_API, data)
        console.log("Response is", response)

      } 
      catch (error) {
        console.log("Error message", error)
        setLoading(false)
      }
  }

  useEffect( () => {
      if(isSubmitSuccessful){
        reset({
          firstName:"",
          lastName:"",
          email:"",
          phone:"",
          message:"",
          
        })
      }
  }, [reset, isSubmitSuccessful] )

  

  return (
    <div>
        <div className='bg-[#161D29] h-[618px] relative'> 

          <div className='w-11/12 max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-10 text-center '>

            <p className='text-[#838894] font-bold text-base mt-16'>About Us</p>

            <div className='text-4xl text-center'>
              <h1 className='text-richblack-5'> Driving Innovation in Online Education for a </h1>
              <h1 className='text-blue-200 font-bold'> Brighter Future </h1>
            </div> 

            <p className='text-[#838894] text-lg'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

          </div>

          <div className='flex items-center justify-center text-center gap-6 absolute mt-20 ml-36'>
            <img src={img1} alt='' />
            <img src={img2} alt='' />
            <img src={img3} alt='' />
          </div>

        </div>

        <div className='border-b border-pure-greys-300'>
          <div className='w-11/12 max-w-[1200px] mx-auto items-center text-center text-4xl mt-32 pb-16'>
            <h1 className='text-richblack-5'>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <span className='text-blue-200'>combines technology</span>, <span className='text-[#ff8400]'>expertise</span>, and community to create an <span className='text-yellow-200'>unparalleled educational experience.</span>
            </h1>
          </div>
        </div>

        <div className='w-11/12 max-w-[1200px] mx-auto flex gap-24 items-center justify-center mt-16'>

          <div className='space-y-6 w-[486px]'>
            <p className='text-4xl font-bold text-white'>Our Founding Story</p>

            <p className='text-[#838894] text-base'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

            <p className='text-[#838894] text-base'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
          <div className='w-[534px]'>
            <img src={foundingImage} alt='' className='w-[470px] h-[278px]'/>
          </div>

        </div>

        <div className='w-11/12 max-w-[1200px] mx-auto flex gap-24 items-center justify-center mt-24'>

          <div className='w-[486px] space-y-6'>
            <h1 className='text-4xl text-[#E65C00]'>Our Vision</h1>
            <p className='text-base text-[#838894]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className='w-[486px] space-y-6'>
            <h1 className='text-4xl text-[#12D8FA]'>Our Mission</h1>
            <p className='text-base text-[#838894]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>

        </div>

        <div className='bg-[#161D29] w-full py-[90px] px-[120px] mt-24'>

          <div className='w-11/12 max-w-[1200px] mx-auto flex justify-between '>
            
            <div className='space-y-3'>
              <h1 className='text-3xl text-center text-white'>5K</h1>
              <p className='text-base text-[#585D69]'>Active Studen</p>
            </div>

            <div className='space-y-3'>
              <h1 className='text-3xl text-center text-white'>10+</h1>
              <p className='text-base text-[#585D69]'>Mentors</p>
            </div>

            <div className='space-y-3'>
              <h1 className='text-3xl text-center text-white'>200</h1>
              <p className='text-base text-[#585D69]'>Courses</p>
            </div>

            <div className='space-y-3'>
              <h1 className='text-3xl text-center text-white'>50+</h1>
              <p className='text-base text-[#585D69]'>Awards</p>
            </div>

          </div>

        </div>

        <div>
          <div className='grid grid-cols-4 w-11/12 max-w-[1180px] mx-auto mt-24'>

            <div className='col-span-2 w-[559px]'>

              <h1 className='text-4xl text-white'>World-Class Learning for <br/> <span className='text-blue-200 font-bold'>Anyone, Anywhere</span> </h1>

              <p className='text-[#838894] text-base'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
              <button className='bg-[#FFD60A] py-3 px-5 rounded-md font-bold'>
                Learn More
              </button>

            </div>

            <div className='w-[294.5px] flex flex-col bg-[#2C333F] px-5 pt-5 gap-9 h-[294px]'>
              <h1 className='text-lg text-white'>Curriculum Based on <br/> Industry Needs</h1>
              <p className='text-sm text-[#AFB2BF]'>The learning process uses the namely online and offline.</p>
            </div>

            <div className='w-[294.5px] flex flex-col bg-[#161D29] px-5 pt-5 gap-9 h-[294px]'>
              <h1 className='text-lg text-white'>Our Learning Methods</h1>
              <p className='text-sm text-[#AFB2BF]'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
            </div>

            <div className='w-[294.5px] flex flex-col h-[294px]'>

            </div>

            <div className='w-[294.5px] flex flex-col bg-[#2C333F] px-5 pt-5 gap-9 h-[294px]'>
              <h1 className='text-lg text-white'>Certification</h1>
              <p className='text-sm text-[#AFB2BF]'>You will get a certificate that can be used as a certification during job hunting.</p>
            </div>

            <div className='w-[294.5px] flex flex-col bg-[#161D29] px-5 pt-5 gap-9 h-[294px]'>
              <h1 className='text-lg text-white'>Rating "Auto-grading"</h1>
              <p className='text-sm text-[#AFB2BF]'>You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.</p>
            </div>

            <div className='w-[294.5px] flex flex-col bg-[#2C333F] px-5 pt-5 gap-9 h-[294px]'>
              <h1 className='text-lg text-white'>Ready to Work</h1>
              <p className='text-sm text-[#AFB2BF]'>Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program</p>
            </div>

          </div>
        </div>

        <div className='mt-24 mb-10'>
          <div className='w-11/12 max-w-[600px] mx-auto '>

            <h1 className='text-center text-4xl text-white'>Get In Touch</h1>
            <p className='text-center text-[#838894] text-base'>We’d love to here for you, Please fill out this form.</p>

            <form onSubmit={handleSubmit(submitContactForm)} className='space-y-3 mt-12'>

              <div className='flex gap-5 text-white'>
                <div className='flex flex-col gap-[6px]'>
                  <label>First Name</label>
                  
                  <input 
                        type='text'
                        id='firstName'
                        name='firstName'
                        {...register("firstName", {required:true})}
                        
                        placeholder='Enter the First Name'
                        className="form-style w-[290px]"
                  />
                  {
                    errors.firstName && (
                      <span>
                        please Enter the First Name
                      </span>
                    )
                  }
                </div>
                
                <div className='flex flex-col gap-[6px]'>
                  <label>Last Name</label>
                    <input 
                          type='text'
                          name='lastName'
                          id='lastName'
                          {...register("lastName")}                         
                          placeholder='Enter the Last Name'
                          className="form-style w-[290px]"
                    />
                </div>
               
              </div>
              <div className='flex flex-col gap-[6px]'>
                <label htmlFor='email' className='text-white'>Email Address</label>
                <input 
                        type='email'
                        name='email'
                        id='submit'
                        {...register("email", {required:true})}
                        placeholder='Enter the Email'
                        className="form-style"
                  />
                  {
                    errors.email && (
                      <span>
                        please fill the email correctly
                      </span>
                    )
                  }
              </div>

              <div className='flex flex-col gap-[6px]'>
              <label htmlFor='' className='text-white'>Phone Number</label>
                <input 
                        type='text'
                        name='phone'
                        id='phone'
                        {...register("phone", {required:true})} 
                        placeholder='Enter the Phone Number'
                        className="form-style"
                  />
              </div>

              <div className='flex flex-col gap-[6px]'>
                <label htmlFor='message' className='text-white'>Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  {...register("message", 
                  {required:true})} 
                  placeholder='Enter The Message' 
                  rows="7" cols="30" 
                  className="form-style"
                />
                {
                  errors.message && (
                    <span>
                      please Enter The Message
                    </span>
                  )
                }
              </div>

              <button type='submit' className='rounded-md bg-yellow-50 text-center px-8 py-2 text-[16px] font-bold text-black w-full'>
                Send Message
              </button>

            </form>

          </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default About
