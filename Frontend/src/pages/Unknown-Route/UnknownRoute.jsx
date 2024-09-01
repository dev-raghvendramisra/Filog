import React from 'react'
import { Button, WorkInProgress } from '../../components'
import { useNavigate } from 'react-router-dom'

function UnknownRoute() {
 const navigate = useNavigate()

  return (
    <div>
      <WorkInProgress lightImg={"/error-placeholders/404-light.webp"} darkImg={"/error-placeholders/404-dark.webp"}>
      <Button primary onClick={()=>navigate("/")}>
        Go to homepage
      </Button>
      </WorkInProgress>
    </div>
  )
}

export default UnknownRoute