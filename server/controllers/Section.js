const Course = require("../models/Course")
const Section = require("../models/Section");
const { create } = require("../models/User");


// create section
const createSection = async(req, res) => {
    try {
        
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId)
        {
            return res.status().json({
                success:false,
                message:"enter the All details"
            })        
        }

        const sectionCreated = await Section.create({sectionName})

        // update the section in the Course 
        const updateCourse = await Course.findByIdAndUpdate(
                                                            courseId, 
                                                            { 
                                                                $push:{ courseContent:sectionCreated._id} 
                                                            }, 
                                                            {new:true}
                                                        )
                                                        .populate({
                                                            path: "courseContent",
                                                            populate: {
                                                                path: "subSection",
                                                            },
                                                        })
                                                        .exec();
        // hw use populate  to replace section in such a way it will return object not the section_ID =>done
        
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            data: updateCourse
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in creating the section"
        })
    }
}

// update section
const updateSection = async(req, res) => {
    try {

        const {sectionName, sectionId, courseId} = req.body;

        if (!sectionId || !sectionName) {
            return res.status(401).json({
                success:false,
                message:"Enter All Details"
            })
        }

        await Section.findByIdAndUpdate(
                                            sectionId,
                                            {sectionName},
                                            {
                                                new:true
                                            }
                                        )

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec()

        
        if(!course){
            console.log("No Data is updated in course")
        }


        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data: course
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in updating the section"
        })
    }
}

// deleteSection
const deleteSection = async(req, res) => {
    try {
        
        // asuming we are sending id in params
        const {sectionId, courseId} = req.params;
        
        await Section.findByIdAndDelete(sectionId);
        // HW :- do we need to delete section also from course ?

        await Course.findByIdAndUpdate(courseId, {
            $pull:{
                courseContent:sectionId
            }
        })

        const updatedCourse = Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec()

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data: updatedCourse
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in deleting the section"
        })
    }
}


module.exports = {createSection, updateSection, deleteSection}