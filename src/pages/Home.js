import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button'
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import Button from '../components/core/Homepage/Button';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import TimeLineSection from '../components/core/Homepage/TimeLineSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>

      {/* section-1 */}

      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

       <Link to={"/signup"}>

        <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 w-fit hover:scale-95'>

            <div className='flex flex-row item-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                <p>Become An Instructor</p>
                <FaArrowRight />
            </div>

        </div>

       </Link>

        <div className='text-center text-4xl font-semibold mt-4'>
          Empower Your Future with  
        <HighlightText text={" Coding Skills"}/>
       </div>

        <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>

          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.

       </div>

       <div className='flex flex-row gap-7 mt-8'>

          <CTAButton active={true} linkto={"/signup"}>
            Learn More 
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>

       </div>

        <div className='mx-3 my-12  shadow-lg shadow-white'>

          <video muted loop autoPlay>
            <source src={banner} type="video/mp4"></source>
          </video>
        </div>


        <div>
          <CodeBlocks position={"lg:flex-row"}
                      heading={
                        <div className='text-4xl font-semibold'>
                          Unlock your 
                          <HighlightText text={" Coding Potential "} />
                          with our coding courses
                        </div>
                      }
                      subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                      }
                      ctabtn1={
                        {
                          btntext: "try it yourself",
                          linkto: "/signup",
                          active: true

                        }
                      }
                      ctabtn2={
                        {
                          btntext: "Learn More",
                          linkto: "/login",
                          active: false

                        }
                      }
                      codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}

                      codeColor={"text-yellow-25"}
          />
        </div>

        
        <div>
          <CodeBlocks position={"lg:flex-row-reverse"}
                      heading={
                        <div className='text-4xl font-semibold max-w-[40%]'>
                         Start 
                          <HighlightText text=' Coding in Second ' />
                        </div>
                      }
                      subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"
                      }
                      ctabtn1={
                        {
                          btntext: "Continue Lesson",
                          linkto: "/signup",
                          active: true

                        }
                      }
                      ctabtn2={
                        {
                          btntext: "Learn More",
                          linkto: "/login",
                          active: false

                        }
                      }
                      codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}

                      codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore />

      </div>

      {/* section-2 */}

      <div className='bg-pure-greys-5 text-richblack-700 '>

        <div className='homepage_bg h-[333px] relative'>

          <div className='w-[11/12] max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
              
                <div className='h-[150px]'></div>

                <div className='flex flex-row gap-7 text-white'>

                  <Button active={true} linkto={"/signup"}>
                      <div className='flex flex-row gap-3'>
                        Explore Full Catalog
                        <FaArrowRight></FaArrowRight>
                      </div>
                  </Button>

                  <Button active={false} linkto={"/login"}>
                    <div className='flex flex-row gap-3'>
                      Learn More
                      
                    </div>
                  </Button>
                </div>

          </div>

        </div>

        <div className='w-[11/12] max-w-maxContent mx-auto flex flex-col item-center justify-between gap-7'>

            <div className='flex flex-row gap-5 mb-10 mt-[95px]'>

                <div className='text-4xl font-semibold w-[45%]'>
                  Get The Skill You Need for a Job 
                  <HighlightText text={"Jobs That are in Demand"} />
                </div>

                <div className='flex flex-col gap-10 w-[40%] items-start'>
                      <div className='text-[16px] '>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills
                      </div>
                      <Button active={true} linkto={"/signup"}>
                          <div>
                            Learn More
                          </div>
                        </Button>
                </div>

            </div>

            <TimeLineSection/>

            <LearningLanguageSection />

        </div>

      </div>

      {/* section-3 */}

      <div className='w-[11/12] max-w-maxContent mx-auto flex flex-col justify-between gap-8 first-letter bg-richblack-900 text-white'>

          <InstructorSection/>

          <h2 className='text-center text-4xl font-semibold mt-10'>Review From Other Learner</h2>

          {/* Review Slider */}
          <ReviewSlider />

      </div>

      {/* Footer */}

      <Footer />

    </div>
  )
}

export default Home