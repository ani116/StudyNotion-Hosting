const cloudinary = require("cloudinary").v2

const uploadImageToCloudinary = async (file, folder, quality) => {
    const option = {folder}

    if(quality)
    {
        option.quality = quality
    }
    option.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, option)
}

module.exports = uploadImageToCloudinary