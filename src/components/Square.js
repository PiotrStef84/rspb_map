import { Rectangle } from "@react-google-maps/api";


import React from 'react'

function Square({id,north, south, east, west, onClick, options}) {

    const bounds = {
        north: north,
        south: south,
        east: east,
        west: west
      }

      // const options ={
      //   strokeColor: "#FF0000",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#FF0000",
      //   fillOpacity: 0.35,
      // }

  return (
    
    <Rectangle
      onClick={onClick}
      bounds={bounds}
      options={options}  
    />
    
  )
}

Square.defaultProps = {
  options: {
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.35,
  },
  id: 100
  
}

export default Square
