import React from 'react'
import { authServices, dbServices } from '../services'
import { useDispatch, useSelector } from 'react-redux'
import useModalActionsContext from '../context/modalActionsContext'
import { ID } from 'appwrite'
import { getFormModal } from '../utils'
import { ImageSelectionCard } from '../components'

function Playground() {



  return (
    <div className='h-100vh w-full flex flex-col justify-center items-center'>
      <ImageSelectionCard />
    </div>
  )
}

export default Playground