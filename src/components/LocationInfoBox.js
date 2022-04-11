import React from 'react'


const LocationInfoBox = ({info}) => {
  return (
    <div className='location-info'>
      <h2>Square Info</h2>
      <ul>
          <li>ID: <strong>{info.id}</strong></li>
          <li>words: <strong>{info.words}</strong></li>
      </ul>
    </div>
  )
}

export default LocationInfoBox
