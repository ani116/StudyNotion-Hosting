const Category = require("../models/Category")
const Course = require("../models/Course")
const mongoose = require("mongoose")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }


const createCategory = async(req, res) => {
    try {
        
        const {name, description} = req.body;
        if(!name || !description) 
        {
            return res.status(401).json({
                success:false,
                message:"Entry All detail"
            })
        }

        const entry = await Category.create({name:name, description:description});
        console.log(entry)

        return res.status(200).json({
            success:true, 
            message:"Category Created successfully",
            entry
        })

    } catch (error) {
        return res.status(401).json({
            success:false, 
            message:"Something went wrong While creating the Tag",
            
        })
    }
}

const getAllCategory = async(req, res) => {
    try {
        
        const allCategory = await Category.find({}, {name:true, description:true})
        return res.status(200).json({
            success:true, 
            message:"All Tags is Returned Successfully",
            data:allCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false, 
            message:"Something went wrong ",
            
        })
    }
}

// categoryPageDetail
const categoryPageDetail = async(req, res) => {
    try {
        
        const {categoryId} = req.body

        console.log("PRINTING CATEGORY ID: ", categoryId);

        const selectedCategory = await Category.findById(categoryId).populate({
            path:"courses",
            populate:{
                path:"ratingAndReviews"
            }
        })
             

        if(!selectedCategory)
            {
                console.log("the selectedCategory is not found")
                return res.status(401).json({
                    success:false, 
                    message:"Category Not Found ",
                    
                })
                
            }

        const findCourseByCategory = await Course.find({category: categoryId}).populate("category").populate("instructor").exec()
        

        if(!findCourseByCategory){
            res.status(404).json({
                success:false,
                message:"Course is not found of categoery"
            })
        }
   

        // get different courses also
        const categoriesExceptSelected = await Category.find({_id: {$ne: categoryId}})
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
              ._id
          )
            .populate("courses")
            .exec()

        const findDifferentCourses = await Course.find({category: categoriesExceptSelected}).populate("instructor")
        

        if(!findDifferentCourses){
            console.log("the different category course  is not found")
            return res.status(401).json({
                success:false, 
                message:"Category Not Found ",
                
            })
        }
        // // get top selling courses HW => 
        // const allCategories = await Category.find()
        // .populate({
        //   path: "courses",
        //   populate: {
        //     path: "instructor",
        // },
        // })
        // .exec()
        // const allCourses = allCategories.flatMap((category) => category.courses)
        // const mostSellingCourses = allCourses
        // .sort((a, b) => b.sold - a.sold)
        // .slice(0, 10)
        
        return res.status(200).json({
            success:true,
            data:{
                findCourseByCategory,
                findDifferentCourses
            },
            message:"Fetched successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false, 
            message:"Something went wrong ",
            error: error
            
        })
    }
}

module.exports = {createCategory, getAllCategory, categoryPageDetail}