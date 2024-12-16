import React from 'react'
import { useLoginModal } from '../../hooks/useFormModal'
import Admin from './Admin';
import {  useSelector } from 'react-redux';

function AdminProt() {
   const openModal = useLoginModal()
   const {isUserAdmin} = useSelector(state=>state.auth)
   React.useEffect(()=>{
    openModal(true);
    return ()=>{
      openModal(false)
    }
   },[])


  if(isUserAdmin){
    return (
    <Admin />
  )}
  return <div className='h-0'>
    
  </div>

}

export default AdminProt