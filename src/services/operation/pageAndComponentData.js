import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { catalogData } from '../apis'

export const getCatalogPageDetail = async(categoryId) => {

    let toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId:categoryId})

        if(!response?.data?.success){
            throw new Error("No Catalog data is found")
        }
        
        result = response?.data

    } catch (error) {
        console.log("CATALog page data is not found", error)
        toast.error(error)
        result = error.response?.data
        console.error("Error fetching category page details:", error); // Added error logging
    }
    toast.dismiss(toastId)
    return result
}

