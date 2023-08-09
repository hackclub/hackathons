import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Head from 'next/head'
import Meta from '@hackclub/meta'
import { useColorMode } from 'theme-ui'
import { filter, orderBy, slice, last, remove } from 'lodash'
import { timeSince, humanizedDateRange } from '../lib/util'
import { getGroupingData } from '../lib/data'
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFja2NsdWIyIiwiYSI6ImNsbDNzY2syazA2ZnQzcm1vMXhndG9nOGkifQ.MQ6hlMQ58LXlipkyJ075tQ';

export default function App({events}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [colorMode, setColorMode] = useColorMode()
  const [lng, setLng] = useState(-51);
  const [lat, setLat] = useState(37);
  const [zoom, setZoom] = useState(2.08);
  useEffect(() => {
	  map.current?.setStyle(`mapbox://styles/mapbox/${colorMode || "light"}-v11`)
  	}, [colorMode])
  useEffect(() => {
	if (map.current) return; // initialize map only once
	console.log(colorMode)
	map.current = new mapboxgl.Map({
	  container: mapContainer.current,
	  style: `mapbox://styles/mapbox/${colorMode || "light"}-v11`,
	  center: [lng, lat],
	  projection: 'mercator',
	  zoom: zoom
	});
	map.current.on('move', () => {
	  setLng(map.current.getCenter().lng.toFixed(4));
	  setLat(map.current.getCenter().lat.toFixed(4));
	  setZoom(map.current.getZoom().toFixed(2));
	});
	events.map(event => {
		if(event.longitude){
			const el = document.createElement('a');
			el.className = 'marker';
			el.style.backgroundImage = `url(${event.logo})`
			el.href = event.website
			el.target = "_blank"
			new mapboxgl.Marker(el)
				.setLngLat([event.longitude, event.latitude])
				.addTo(map.current)
		}
	})
  });

  return (
	<div>
		<Meta
  		as={Head}
  		title={`The Map of Hackathons`}
  		description={`A map of all the high-school hackathons, ever.`}
	  />
	  <div ref={mapContainer} className="map-container" />
	  <style>
	  {`
		  .map-container {
		  	height: 600px;
		  }
		  .marker {
		  	background: #121217;
		  	opacity: 0.95!important;
			border: 1px solid var(--theme-ui-colors-border);
			box-sizing: border-box;
		  	height: 24px;
			width: 24px;
			object-fit: cover;
			border-radius: 999px;
			background-size: cover;
			background-position: center;
		  }
		  footer {
			margin-top: 0px!important;
		  }
	  `}
	  
	  </style>
	</div>
  );
}

export const getStaticProps = async () => {
  let { events } = await getGroupingData()
  // Sort upcoming events by start date
  let upcomingEvents = orderBy(
	filter(events, e => new Date(e.end) >= new Date()),
	'start'
  )
  let previousEvents = orderBy(
	filter(events, e => (new Date(e.end) < new Date())),
	'start',
	'desc'
  )
  return { props: { events: [ ...upcomingEvents, ...previousEvents ] }, revalidate: 1 }
}