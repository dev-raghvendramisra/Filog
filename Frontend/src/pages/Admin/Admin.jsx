import React from 'react'
import { Button } from '../../components'
import { adminService } from '../../services/Admin/adminService'

function Admin() {
  return (
    <div className='flex h-screen flex-col gap-4 justify-start items-center'>
      <p className='text-2vw mt-10p'>Admin Services</p>
     <div className='flex gap-2'>
     <Button primary onClick={async()=>{
      await adminService.getLogs()
     }}>Get Logs</Button>
     <Button primary onClick={async()=>{
      await adminService.getLogs()
     }}>Get Users</Button>
     </div>
    </div>
  )
}

export default Admin