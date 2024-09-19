import React from 'react'

function ImageSelectionCard() {
  
  const fileInput = React.useRef(null)
  const [imageSrc, setImageSrc] = React.useState(null)

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    console.log(file)
  }
  const dispatchEventOnInput = ()=>{
    fileInput.current.click()
  }

  return (
    <div className={`h-10vw w-20vw bg-blue-400 bg-[url(${imageSrc || '/error-placeholders/imageSelectorPlaceholder.webp'})]`} onClick={dispatchEventOnInput}>
        <input type="file" className='sr-only' ref={fileInput} onChange={handleImageChange} accept='image/jpeg, image/png, image/webp'/>
    </div>
  )
}

export default ImageSelectionCard