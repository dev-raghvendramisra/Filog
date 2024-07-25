import React from 'react'
import { HomeHero, HomeUpper } from '../../Components'

function Home() {
  return (
    <div className='flex flex-col justify-start gap-80 items-center min-h-100vh  mb-6vw'>
      <HomeUpper />
      {/* <h1>Get Featured</h1> */}
      <HomeHero />
    </div>
  )
}

export default Home