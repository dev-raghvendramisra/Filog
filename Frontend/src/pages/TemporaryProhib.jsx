import React from 'react'

function TemporaryProhib() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white text-center p-6">
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold">Limited Availability</h2>
      <p className="mt-2 text-lg opacity-80">
        We are currently available for larger screens only. Please switch to a desktop or tablet for the best experience.
      </p>
    </div>
  </div>
  )
}

export default TemporaryProhib