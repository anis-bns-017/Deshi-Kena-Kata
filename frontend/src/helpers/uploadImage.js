const uploadImage = async (files) => {
   const cloudName = "dx8d44nwb"; // Replace with your Cloudinary cloud name
   const uploadPreset = "deshi_kena_kata"; // Replace with your upload preset
 
   const uploadedUrls = [];
 
   for (const file of files) {
     const formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", uploadPreset);
 
     try {
       const response = await fetch(
         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
         {
           method: "POST",
           body: formData,
         }
       );
 
       if (!response.ok) {
         throw new Error("Failed to upload image to Cloudinary");
       }
 
       const data = await response.json();
       uploadedUrls.push(data.secure_url); // Store the secure URL of the uploaded image
     } catch (error) {
       console.error("Error uploading image:", error);
     }
   }
 
   return uploadedUrls; // Return an array of Cloudinary URLs
 };

 export default uploadImage;