import React, { useEffect, useState } from "react";
import { useColorModeValue, Text } from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";
import Tangram from "tangram";

import { decode } from "../../utils/flexible-polyline";

export const LeafletMap = () => {
  const [startPolylineArr, setStartPolylineArr] = useState([]);
  const [destinationPolylineArr, setDestinationPolylineArr] = useState([]);
  const [waypointsPolylineArr, setWaypointsPolylineArr] = useState([]);
  const [startPoint, setStartPoint] = useState({ lat: -34.567699, lng: -58.486575 });
  const [destinationPoint, setDestinationPoint] = useState({ lat: -34.7046285, lng: -58.5289298 });
  const [waypointsPoint, setWaypointsPoint] = useState([
    { lat: -34.7046285, lng: -58.5289298 },
    { lat: -34.7046285, lng: -58.5289298 },
  ]);
  const color = useColorModeValue("normal.day", "reduced.night");
  const hereTile = `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${color}/{z}/{x}/{y}/512/png8?apiKey=${
    import.meta.env.VITE_HERE_API_KEY
  }&ppi=320`;

  const herePolyline = `https://router.hereapi.com/v8/routes?apiKey=${
    import.meta.env.VITE_HERE_API_KEY
  }&transportMode=car&origin=-34.6046285,-58.4289298&destination=-34.8046285,-58.6289298&return=polyline`;

  const herePolylineWaypoints = `https://router.hereapi.com/v8/routes?origin=-34.567699,-58.486575&transportMode=car&destination=-34.601645,-58.415799&via=-34.606951,-58.463770&via=-34.618926,-58.461025&return=polyline,summary&apiKey=${
    import.meta.env.VITE_HERE_API_KEY
  }`;

  useEffect(() => {
    (async () => {
      const response = await fetch(herePolylineWaypoints);
      const data = await response.json();

      const startPolyline = data.routes[0].sections[0].polyline;
      const destinationPolyline =
        data.routes[0].sections[data.routes[0].sections.length - 1].polyline;
      const waypointsPolyline = data.routes[0].sections[1].polyline;

      const startLocation = data.routes[0].sections[0].departure.place.location;
      const destinationLocation =
        data.routes[0].sections[data.routes[0].sections.length - 1].arrival.place.location;

      const waypointsStartLocation = data.routes[0].sections[1].arrival.place.location;
      const waypointsDestinationLocation = data.routes[0].sections[1].departure.place.location;

      const decodeStartPolyline = decode(startPolyline);
      const decodeDestinationPolyline = decode(destinationPolyline);
      const decodeWaypointsPolyline = decode(waypointsPolyline);

      setStartPoint(startLocation);
      setDestinationPoint(destinationLocation);
      setWaypointsPoint([waypointsStartLocation, waypointsDestinationLocation]);

      setStartPolylineArr(decodeStartPolyline.polyline);
      setDestinationPolylineArr(decodeDestinationPolyline.polyline);
      setWaypointsPolylineArr(decodeWaypointsPolyline.polyline);
    })();
  }, []);

  return (
    <>
      <MapContainer
        center={[-34.7046285, -58.5289298]}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100vw", zIndex: 0 }}
        zoom={11}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer url={hereTile} />
        <Marker position={[startPoint.lat, startPoint.lng]}>
          <Tooltip direction="top" offset={[-15, -5]} opacity={1}>
            <Text fontWeight="bold" textAlign="center">
              Burger King
            </Text>
            <Text textAlign="center">Av. del Libertador 7640</Text>
            <Text color="gray" fontStyle="italic" textAlign="center">
              Recepción
            </Text>
          </Tooltip>
        </Marker>
        <Marker position={[destinationPoint.lat, destinationPoint.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[waypointsPoint[0].lat, waypointsPoint[0].lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[waypointsPoint[1].lat, waypointsPoint[1].lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polyline pathOptions={{ color: "lime" }} positions={startPolylineArr} />
        <Polyline pathOptions={{ color: "red" }} positions={destinationPolylineArr} />
        <Polyline pathOptions={{ color: "blue" }} positions={waypointsPolylineArr} />
        <MyMap />
      </MapContainer>
    </>
  );
};

const MyMap = () => {
  const map = useMap();

  useEffect(() => {
    let layer = Tangram.leafletLayer({
      scene: "/tilezen.yaml",
    });

    layer.addTo(map);

    return (): void => {
      map.removeLayer(layer);
    };
  }, []);

  return null;
};
