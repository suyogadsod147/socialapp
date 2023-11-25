import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUNINARY_CLOUD_NAME, 
    api_key: process.env.CLOUNINARY_API_KEY,
    api_secret: process.env.CLOUNINARY_API_SECRET, 
  });


  const uplodOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath)return null;
        const response =  await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file is uploded on cloudinary" , response.url)
        return response;
            
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // remove the local saved file as uplod opration got failed
        return null

    }
  }

  export {uplodOnCloudinary}