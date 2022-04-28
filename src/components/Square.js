import { Rectangle } from "@react-google-maps/api";


import React from 'react'

function Square({north, south, east, west, onClick}) {

    const bounds = {
        north: north,
        south: south,
        east: east,
        west: west
      }

      const options ={
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      }

  return (
    
    <Rectangle
      onClick={onClick}
      bounds={bounds}
      options={options}  
    />
    
  )
}

export default Square
