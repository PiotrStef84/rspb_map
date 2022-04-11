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


function Map() {
    const [locationInfo, setLocationInfo] = useState(null)
       
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
        // mapTypeId = "satellite"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        >
        {squares}
        
        <Border/>
        </GoogleMap>
        {locationInfo && <LocationInfoBox info={locationInfo}/>}
        </div>
        </>
  )
}


export default Map
