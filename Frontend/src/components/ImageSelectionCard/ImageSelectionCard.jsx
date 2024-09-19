import React from 'react'
import useTheme from '../../context/themeContext'

function ImageSelectionCard({ message, 
    darkPlaceholder = "/error-placeholders/uploadPlaceholder-dark.webp", 
    lightPlaceholder = "/error-placeholders/uploadPlaceholder-light.webp", 
    height = "18vw", 
    width = "56vw",
    type="rect",
    imgsrc }) {

    const fileInput = React.useRef(null)
    const [imageSrc, setImageSrc] = React.useState(imgsrc)
    const { isDark } = useTheme()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setImageSrc(reader.result)
        }
        reader.readAsDataURL(file)
        console.log(file)
    }
    const dispatchEventOnInput = () => {
        fileInput.current.click()
    }

    return (
        <div className={`${type=="rect" ? "py-1vw" :"p-0.5vw"} ${imageSrc && "text-transparent"} gap-2 relative flex flex-col overflow-hidden justify-center items-center ${type=="rect"?"rounded-xl":"rounded-full"} border-2 dark:border-1 cursor-pointer dark:border-footer_text dark:border-opacity-40`} onClick={dispatchEventOnInput}
        style={{width:width,height:height}}>
            <div id="scrim-add-your-image" className='h-100p z-20 rounded-xl w-full backdrop-blur-md  absolute top-0 left-0 bg-gray-100 bg-opacity-20 dark:bg-darkPrimary_grays_darker dark:bg-opacity-5 hover:opacity-100 opacity-0 transition-all flex justify-center items-center'>
                <div className='flex justify-center items-center gap-2 px-1vw py-0.5vw rounded-full border-1 border-footer_text border-opacity-70 text-1vw text-darkPrimary dark:text-gray-200 dark:bg-darkPrimary_grays bg-white hover:hoverAnim overflow-hidden transition-all'>
                    <span className="fa-solid fa-cloud-arrow-up"></span>
                    <span>Upload your image</span>
                </div>
            </div>
            {imageSrc && <img className={`h-full w-full object-cover absolute top-0 z-10 left-0 rounded-xl`} src={imageSrc} />}
            { imageSrc || <img className={` h-70p opacity-50`} src={`${isDark ? darkPlaceholder : lightPlaceholder}`}/>}
            { type=="circ" || imageSrc || message && <p className='text-footer_text text-1.2vw'>{message}</p>}
            <input type="file" className='sr-only' ref={fileInput} onChange={handleImageChange} accept='image/jpeg, image/png, image/webp' />
        </div>
    )
}

export default ImageSelectionCard