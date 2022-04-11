import { Rectangle } from "@react-google-maps/api";


import React from 'react'

function Square({north, south, east, west, onClick}) {

    const bounds = {
        north: north,
        south: south,
        east: east,
        west: west
      }

  return (
    
    <Rectangle
      onClick={onClick}
      bounds={bounds}  
    />
    
  )
}

export default Square
