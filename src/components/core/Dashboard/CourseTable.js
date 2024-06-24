import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Thead, Tr, Th } from 'react-super-responsive-table'
import { deleteCourse, fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../../services/formatDate'
import { FiEdit2 } from 'react-icons/fi'
import {RiDeleteBinLine} from 'react-icons/ri'

const CourseTable = ({courses, setCourses}) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async(courseId) => {
        setLoading(true)
        await deleteCourse({courseId:courseId}, token)
        const result = await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }


  return (
    <div className='text-white'>
      
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Th> 
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">Duration</Th> 
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">Price</Th> 
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">Action</Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                courses.length === 0 ? (
                    <Tr>
                        <Td colSpan="4" className="py-10 text-center text-2xl font-medium text-richblack-100">
                            No Course Found
                        </Td>
                    </Tr>
                ) : 
                courses.map((course) => (
                    <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                        <Td className="flex gap-x-4">
                            <img 
                                src={course?.thumbnail}
                                className='h-[150px] w-[220px] rounded-lg object-cover'
                                alt={course.courseName} // Added alt attribute
                            />
                            <div className='flex flex-col justify-between'>
                                <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                <p className="text-xs text-richblack-300">
                                    {course.courseDescription.split(" ").length >
                                    TRUNCATE_LENGTH
                                        ? course.courseDescription
                                            .split(" ")
                                            .slice(0, TRUNCATE_LENGTH)
                                            .join(" ") + "..."
                                        : course.courseDescription}
                                </p>
                                <p className="text-[12px] text-white">
                                    Created: {formatDate(course.createdAt)}
                                </p>
                                
                            </div>

                        </Td>
                        <Td className="text-sm font-medium text-richblack-100">
                            2hr 30min
                        </Td>
                        <Td className="text-sm font-medium text-richblack-100">
                            ₹{course.price}
                        </Td>
                        <Td className="text-sm font-medium text-richblack-100">
                            <button disabled={loading} 
                                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"            
                            >
                                <FiEdit2 size={20} />
                            </button>
                            <button
                                onClick={() => handleCourseDelete(course._id)}
                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                            >
                                <RiDeleteBinLine size={20} />
                            </button>
                        </Td>
                    </Tr>
                ))

            }
        </Tbody>
      </Table>

    </div>
  )
}

export default CourseTable
