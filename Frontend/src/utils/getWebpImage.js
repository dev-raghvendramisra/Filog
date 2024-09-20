import imageCompression from 'browser-image-compression'

export default async function getWebpImage(file,setImageSrc,name) {
     const reader = new FileReader()
        reader.onload = (e) => {
        setImageSrc(e.target.result)
        }
     reader.readAsDataURL(file)

     const finalFile = await imageCompression(file,{maxSizeMB:1,useWebWorker:true, fileType:"image/webp"})
     const finalFileObject = new File([finalFile], `${name}.webp`, { type: finalFile.type });
     return finalFileObject;
  }
  