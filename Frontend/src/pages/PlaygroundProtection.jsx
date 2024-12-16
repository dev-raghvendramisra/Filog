import React from 'react'
import { useSelector } from 'react-redux'
import { UnknownRoute } from '../components'
import Playground from './Playground'

function PlaygroundProtection() {
  const {isUserAdmin} = useSelector(state=>state.auth)

   
  if(!isUserAdmin ){
    return <UnknownRoute />
  }

  return <Playground />

}

export default PlaygroundProtection