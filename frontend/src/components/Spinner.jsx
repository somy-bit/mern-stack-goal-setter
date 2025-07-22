import React from 'react'

function Spinner() {
  return (
    <div className='w-full h-screen bg-black/15 flex items-center justify-center'>
        <div className='h-16 w-16 border-4 border-dotted   border-blue-500 rounded-full animate-spin ' />
           
    </div>
  )
}

export default Spinner