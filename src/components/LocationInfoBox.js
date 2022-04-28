import React from 'react'


const LocationInfoBox = ({info, onClick, onClick2}) => {
  return (
    <div className='location-info'>
      <h2>Square Info</h2>
      <ul>
          <li>ID: <strong>{info.id}</strong></li>
          <li>words: <strong>{info.words}</strong></li>
      </ul>
      <button onClick={onClick}>Click me!</button>
      <button onClick={onClick2}>Say Hello!</button>
    </div>
  )
}

export default LocationInfoBox
