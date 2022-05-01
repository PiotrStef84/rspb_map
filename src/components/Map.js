import { GoogleMap, useLoadScript } from "@react-google-maps/api";

// import Data from "./squares.json"
import Data from "./newJson.json"

import Square from "./Square";
import Border from "./Border";
import LocationInfoBox from "./LocationInfoBox";


import {useState} from 'react'

const sponsoredSquareStyling = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  }

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
  };

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeId: "satellite",
    restriction: {
      latLngBounds: Rainforest,
      strictBounds: false,
    }
  };



function Map() {


    const [locationInfo, setLocationInfo] = useState(null)
    const [newSquares, setSquares] = useState([]);
       
   const squares = Data.map(ev =>{
       return <Square id={ev.id} north={ev.north} south={ev.south} east={ev.east} west={ev.west} onClick={() => setLocationInfo({id: ev.id, words: ev.words})} options={sponsoredSquareStyling}/>
   })

  function replaceSquares(time){

    let id;
    let north;
    let east;
    let south;
    let west;
    let words;
    
      for (let i = 0; i < newSquares.length; i++) {

        if(newSquares[i].time.toISOString() === time){         
          id = Data.length;
          north = newSquares[i].north;
          east = newSquares[i].east;
          south = newSquares[i].south;
          west =  newSquares[i].west;
          words = newSquares[i].words;
                  
          newSquares.splice(i, 1)
          i--;
          console.log("HEY")
        

        }}
        Data.push({
          id: id,
          north: north,
          east: east,
          south: south,
          west: west,
          words: words,
        })
      }
  
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
        options={options}
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
                id: 100,
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
            id={ev.id} north={ev.north} south={ev.south} east={ev.east} west={ev.west} onClick={() => setLocationInfo({id: 100, words: ev.words, time: ev.time.toISOString()})}/>
          ))}

        {squares}
        
        <Border/>
        </GoogleMap>
        {locationInfo && <LocationInfoBox info={locationInfo} onClick={() => setLocationInfo(null)} onClick2={() => replaceSquares(locationInfo.time)}/>}
        </div>
        </>
  )
}


export default Map



