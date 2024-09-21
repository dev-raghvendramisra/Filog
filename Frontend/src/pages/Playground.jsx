import React from 'react'
import { authServices, dbServices } from '../services'
import { useDispatch, useSelector } from 'react-redux'
import useModalActionsContext from '../context/modalActionsContext'
import { ID } from 'appwrite'
import { getFormModal } from '../utils'
import { ImageSelectionCard } from '../components'
import { useAvatarFormModal } from '../hooks'

function Playground() {
 
  const [file, setFile] = React.useState(null)
  const {userId} = useSelector(state=>state.userProfile)

  const openAvatarModal = useAvatarFormModal()


  return (
    <div className='h-100vh w-full flex flex-col justify-center items-center'>
      {/* <ImageSelectionCard message="Recommended cover image size is 1080x350"type='rect' height='18vw' width='56vw' setFile={setFile} /> */}
      {/* <button
       onClick={async()=>{
         if(!file) return console.log('No file selected')
          const res = await dbServices.uploadImage(file,userId)
          if(res.fileId){
            console.log('Image uploaded successfully')
            console.log(res)
          }
       }}
      >Upload</button> */}
      {/* <button onClick={()=>{
                const url = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = url;
                link.download = file.name || 'compressed.webp';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
      }}>Download</button> */}

      <button onClick={()=>openAvatarModal(true)}>Test modal</button>
    </div>
  )
}

export default Playground