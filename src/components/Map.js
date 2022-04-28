import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Data from "./squares.json"
import Square from "./Square";
import Border from "./Border";
import LocationInfoBox from "./LocationInfoBox";


import {useState} from 'react'

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
  }
  const center = {
    lat: 56.69136,
    lng: -5.75009,
  };


  const Rainforest = {
    north: 56.703989745779374,
    south: 56.664649218979356,
    west: -5.817252513732902,
    east: -5.71193825897216,
     
  }


function Map() {
    const [locationInfo, setLocationInfo] = useState(null)
    const [newSquares, setSquares] = useState([]);
       
   const squares = Data.map(ev =>{
       return <Square north={ev.north} south={ev.south} east={ev.east} west={ev.west} onClick={() => setLocationInfo({id: ev.id, words: ev.words})}/>
   })
  
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });


    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
  
    return (
        <>
        
        <div><GoogleMap 
        mapTypeId = "satellite"
        mapContainerStyle={mapContainerStyle}
        bounds={Rainforest}
        zoom={14}
        center={center}
        onClick={(event) => {
          async function getCoord(){
            try{
              const lat = event.latLng.lat()
              const lng = event.latLng.lng()
              
              console.log(lat,lng)
              
              const response = await fetch(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${lat}, ${lng}&language=en&key=ORUSL8PM`);
              const res = await response.json()


              const north = res.square.northeast.lat;
              const east = res.square.northeast.lng;
              const south = res.square.southwest.lat;
              const west = res.square.southwest.lng;
              const words = res.words;

              

              console.log(words)
              setSquares(current =>[...current, {
                north: north,
                east: east,
                south: south,
                west: west,
                words: words,
                time: new Date(),
              }])
              }catch(error){
                console.log(error)
              }
          }
          getCoord()
          
        }}
        >
          {newSquares.map(ev =>(
            <Square key={ev.time.toISOString()} 
            north={ev.north} south={ev.south} east={ev.east} west={ev.west} onClick={() => setLocationInfo({id: 100, words: ev.words})}/>
          ))}

        {squares}
        
        <Border/>
        </GoogleMap>
        {locationInfo && <LocationInfoBox info={locationInfo}/>}
        </div>
        </>
  )
}


export default Map
