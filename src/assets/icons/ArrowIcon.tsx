import React from 'react'

export const ArrowIcon = ({
  width = '20',
  height = '20',
  fill = '#7d8590',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.8625 3.225L13.3791 1.75L5.13745 10L13.3875 18.25L14.8625 16.775L8.08745 10L14.8625 3.225Z"
        fill={fill}
      />
    </svg>
  )
}