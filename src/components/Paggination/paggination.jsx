import React from 'react'

const paggination = ({totalCount, pageSize, currentPage}) => {

    const numberOfPages= () => {
        let pageCount = Math.floor(totalCount/pageSize) + 1;
    }

  return (
    <div>paggination</div>
  )
}

export default paggination
