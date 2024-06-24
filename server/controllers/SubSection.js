const SubSection = require("../models/SubSection")
const Section = require("../models/Section")
const Course = require("../models/Course")
const uploadImageToCloudinary = require("../utils/imageUploader")
const User = require("../models/User")
require("dotenv").config()

// createSubSection
const createSubSection = async(req, res) => {
    try {
        
        const {sectionId, title, timeDuration, description} = req.body;

        const video = req.files.video;

        if(!title || !description  
            // || !video
        )
        {
            return res.status(401).json({
                success:false,
                message:"Enter All Details"
            })
        }

        const response = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        const newSubSection = await SubSection.create({
                                                        title:title, 
                                                        timeDuration:timeDuration,  
                                                        description:description,
                                                        videoUrl:response.secure_url,
                                                    })

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {$push: {subSection:newSubSection._id
        } }, {new:true}).populate("subSection").exec()

        // HW = use populate  to replace subsection in such a way it will return object not the section_ID => done

        return res.status(200).json({
            success:true,
            message:"You successfully created a subsection",
            data: updatedSection
        })
    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in creating a subsection"
        })
    }
}

// updateSubSection
const updateSubSection = async (req, res) => {
    try {
       
        const { sectionId,
                subSectionId, 
                title, 
                // timeDuration, 
                description, 
            } = req.body;

        // const video = req.files.video;

        if(!title || 
            // !timeDuration || 
            !description 
            // || !video
        )
        {
            return res.status(401).json({
                success:false,
                message:"Enter All Details"
            })
        }

        // const response = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        
        const updatedSubSection = await SubSection.findByIdAndUpdate(
                                                        subSectionId, 
                                                        {
                                                            title:title, 
                                                            // timeDuration:timeDuration, 
                                                            description:description, 
                                                            // video: response.secure_url
                                                        }
                                                        )

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec()

        return res.status(200).json({
            success:true,
            message:"SubSection updated successfullt", 
            data: updatedSection
        })

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in updating a subsection"
        })
    }
}

// deleteSubSection

const deleteSubSection = async(req, res) => {
    try {
        
        const {subSectionId, sectionId} = req.body;

        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: subSectionId,
              },
            }
          )
        
        const subSection =  await SubSection.findByIdAndDelete(subSectionId)

        
        if (!subSection) {
            return res
              .status(404)
              .json({ success: false, message: "SubSection not found" })
          }

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            data: updatedSection
        })

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in Deleting a subsection",
        })
    }
}



module.exports = {createSubSection, updateSubSection, deleteSubSection}