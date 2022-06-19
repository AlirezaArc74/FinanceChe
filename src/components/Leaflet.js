// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "../App.css";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import { Icon } from "leaflet";
// import RoomIcon from "@mui/icons-material/Room";
// import { useState, useCallback, useEffect } from "react";
// import { render } from "react-dom";







// const center = [51.505, -0.09]
// const zoom = 13

// function DisplayPosition({ map }) {
//   const [position, setPosition] = useState(() => map.getCenter())

//   const onClick = useCallback(() => {
//     map.setView(center, zoom)
//   }, [map])

//   const onMove = useCallback(() => {
//     setPosition(map.getCenter())
//   }, [map])

//   useEffect(() => {
//     map.on('move', onMove)
//     return () => {
//       map.off('move', onMove)
//     }
//   }, [map, onMove])

//   return (
//     <p>
//       latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
//       <button onClick={onClick}>reset</button>
//     </p>
//   )
// }

// function ExternalStateExample() {
//   const [map, setMap] = useState(null)

//   const displayMap = useMemo(
//     () => (
//       <MapContainer
//         center={center}
//         zoom={zoom}
//         scrollWheelZoom={false}
//         ref={setMap}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     ),
//     [],
//   )

//   return (
//     <div>
//       {map ? <DisplayPosition map={map} /> : null}
//       {displayMap}
//     </div>
//   )
// }

// render(<ExternalStateExample />)

// export default ExternalStateExample










// // const Leaflet = () => {
// //   const [position, setPosition] = useState(null);
// //   console.log(position)

  
  

// //   return (
// //     <>
// //       <RoomIcon
// //         style={{ zIndex: 999 }}
// //         className="fixed  top-[20rem] left-[34rem] "
// //       />

// //       <div className="h-[19rem] ">
// //         <MapContainer
// //           center={[12.505, -0.09]}
// //           zoom={13}
// //           scrollWheelZoom={false}
          
// //           onChange={(e) => setPosition(e.target.value)}

// //         >
// //           <TileLayer
// //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           />
// //           <Marker
// //             position={[12.505, -0.09]}
// //             icon={
// //               new Icon({
// //                 iconUrl: markerIconPng,
// //                 iconSize: [25, 41],
// //                 iconAnchor: [12, 41],
// //               })
// //             }
// //           >
// //             <Popup>
// //               A pretty CSS3 popup. <br /> Easily customizable.
// //             </Popup>
// //           </Marker>
// //         </MapContainer>
// //       </div>
// //     </>
// //   );
// // };

// // export default Leaflet;
