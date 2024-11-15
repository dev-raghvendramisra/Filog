import React from 'react'

function Dropdown({ setOpenDropdown, children, className,...props}) {
  const [displayChevron, setDisplayChevron] = React.useState(false)
  const container = React.useRef()

  React.useEffect(() => {
    const currentContainer = container.current

    const handleContainerScroll = () => {
      if (currentContainer.scrollTop + currentContainer.clientHeight + 1 >= currentContainer.scrollHeight) {
        return setDisplayChevron(false)
      }
      setDisplayChevron(true)
    }

    if (currentContainer) {
      if (currentContainer.scrollHeight <= currentContainer.clientHeight) {
        setDisplayChevron(false)
      } else {
        setDisplayChevron(true)
        currentContainer.addEventListener('scroll', handleContainerScroll)
      }
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleContainerScroll)
      }
    }
  }, [container.current])





  return (
    <div className={`h-14vw rounded-3xl dropDownAnim text-1.1vw bg-white ${className.includes("dark:bg") ? "" :"dark:bg-toastDarkModeBg"}  ${className} `}{...props}>
      <div
        ref={container}
        className={`flex flex-col items-center justify-start hideScrollbar overflow-scroll w-fit h-full  text-darkPrimary z-20 dark:text-gray-200  p-0.7vw gap-1`}
      >
        {children.map((child, index) => (
          <button
            key={index} 
            className={`hover:bg-blue-100 hover:dark:bg-darkPrimary_grays_darker hover:scale-x-105 transition-all flex w-full rounded-xl items-center justify-start gap-3 px-0.8vw py-0.5vw ${child.danger && "text-danger hover:bg-red-100 hover:dark:bg-red-500 hover:dark:bg-opacity-20"}`}
            onClick={() => {
              setOpenDropdown(false)
              child.onClick()  
            }}
          >
            <span className='text-1.3vw'>{child.icon}</span>
            {child.text}
          </button>
        ))}
      </div>

      {displayChevron && (
        <div className='text-0.5vw text-darkPrimary w-100p text-center py-0.2vw bg-white dark:text-gray-200 px-1vw dark:bg-toastDarkModeBg absolute bottom-0'>
          <span className='fa solid fa-chevron-down animate-bounce'></span>
        </div>
      )}
    </div>
  )
}

export default Dropdown
