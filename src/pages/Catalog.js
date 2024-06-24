import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogPageDetail } from '../services/operation/pageAndComponentData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Footer from '../components/common/Footer'

const Catalog = () => {

  const {catalogName} = useParams()
  const [cataloPageData, setCatalogPageData] = useState([])
  const [active, setActive] = useState(1)
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    const getCategories = async() => {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase()=== catalogName)[0]?._id
     
      if (!category_id) {
        console.error("Category not found for catalogName:", catalogName);
        return; // Return early if category is not found
      }
      console.log("The category id is ", category_id);

      setCategoryId(category_id)
    }
    getCategories()
  }, [catalogName])

  useEffect(() => {
    const getCategoriesPageDetail = async() => {
      try {
        if(!categoryId){
          console.log("Category id is Invalid:", categoryId)
          return
        }
        

        const res = await getCatalogPageDetail(categoryId)
        console.log("printing res:", res)
        setCatalogPageData(res)
        console.log("the catalogPageDetail", cataloPageData)
      } 
      catch (error) {
        console.log("the Category page detail", error.response?.data || error.message)
      }
    }
    getCategoriesPageDetail()
  }, [categoryId])

  return (
    <div className='box-content bg-richblack-800 px-4'>
        <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
            <p className='text-sm text-richblack-300'>
              {`Home / Catalog / `} 
              <span className="text-yellow-25">
                {
                  cataloPageData?.data?.findCourseByCategory[0]?.category?.name
                }
              </span>
            
            </p>
            <p className="text-3xl text-richblack-200">{cataloPageData?.data?.findCourseByCategory[0]?.category?.name}</p>
            <p className='max-w-[870px] text-richblack-200'>{cataloPageData?.data?.findCourseByCategory[0]?.category?.description}</p>
        </div>
        <div>

          {/* section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Course to get You In</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>

              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>

            <div>
              <CourseSlider courses={cataloPageData?.data?.findCourseByCategory} />
            </div>
          </div>

          {/* ṣection 2 */}
          <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div className="section_heading">
              Top courses
            </div>
            <div className='py-8'>
              <CourseSlider courses={cataloPageData?.data?.findDifferentCourses} />
            </div>
          </div>

        

        </div>
        <Footer/>
    </div>
  )
}

export default Catalog
