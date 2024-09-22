import imageCompression from 'browser-image-compression'
import getFormattedTime from './getFormattedTime'

export default async function getWebpImage(file,setImageSrc,name, setProcessing) {
    setProcessing && setProcessing(true)
    let finalFileObject
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
       setImageSrc && setImageSrc(e.target.result)
      }
     reader.readAsDataURL(file)
     const finalFile = await imageCompression(file,{maxSizeMB:1,useWebWorker:true, fileType:"image/webp"})
     finalFileObject = new File([finalFile], `${name}-${getFormattedTime(true)}.webp`, { type: finalFile.type });
    } catch (error) {
      setProcessing && setProcessing(false)
      return null;
    }
     setProcessing && setProcessing(false)
     return finalFileObject;
  }
