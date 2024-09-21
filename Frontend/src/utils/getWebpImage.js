import imageCompression from 'browser-image-compression'
import getFormattedTime from './getFormattedTime'

export default async function getWebpImage(file,setImageSrc,name, setProcessing) {
    setProcessing && setProcessing(true)
     const reader = new FileReader()
        reader.onload = (e) => {
         setImageSrc && setImageSrc(e.target.result)
        }
     reader.readAsDataURL(file)

     const finalFile = await imageCompression(file,{maxSizeMB:1,useWebWorker:true, fileType:"image/webp"})
     const finalFileObject = new File([finalFile], `${name}-${getFormattedTime(true)}.webp`, { type: finalFile.type });
    setProcessing && setProcessing(false)
     return finalFileObject;
  }
