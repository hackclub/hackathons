import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Head from 'next/head'
import Meta from '@hackclub/meta'
import { useColorMode, Box, Link } from 'theme-ui'
import { filter, orderBy, slice, last, remove } from 'lodash'
import { timeSince, humanizedDateRange } from '../lib/util'
import { getGroupingData } from '../lib/data'
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFja2NsdWIyIiwiYSI6ImNsbDNzY2syazA2ZnQzcm1vMXhndG9nOGkifQ.MQ6hlMQ58LXlipkyJ075tQ';

const uniquify = arr => [...new Set(arr)]

export default function App({events, citiesThisPastYear}) {
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
			el.className = event.past ? 'marker' : 'marker upcoming';
			el.style.backgroundImage = `url(${event.logo})`
			el.href = event.website
			el.title = event.name
			el.target = "_blank"
			const child = el.appendChild(document.createElement("div"))
			child.className = 'hidden-child'
			child.innerHTML = `
			<div class="name-and-logo">
				<img src="${event.logo}" class="logo" />
				<h3>${event.name}</h3>
			</div>
			<div class="location">
				${event.city}, ${event.state}, ${event.country} 
			</div>
			<div class="url">
				${new URL(event.website).host} 
			</div>
			`
			child.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.675) 75%), url(${event.banner})`
			let random1 = Math.random() * 0.025
			let random2 = Math.random() * 0.025
			let longitude = parseFloat(event.longitude) + random1 - 0.015
			let latitude = parseFloat(event.latitude) + random2 - 0.0125
			new mapboxgl.Marker(el)
				.setLngLat([longitude, latitude])
				.addTo(map.current)
		}
	})
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false,
	  })
  });

  return (
	<div>
		<Meta
  		as={Head}
  		title={`The Map of High School Hackathons`}
  		description={`This past year, we've had a high-school hackathon in 
				${citiesThisPastYear.length} cities around the world.`}
	  />
	  <div ref={mapContainer} className="map-container"> 

		  <Box className="info-pane" sx={{
			    borderRadius: '4px',
				marginTop: '16px',
				padding: '16px',
			    backgroundColor: 'sunken',
				color: 'text'
			  }}>
		  	This past year, we've had a high-school hackathon in {" "}
		  	<b>{citiesThisPastYear.length} cities around the world</b>. Can't find one in your hometown? <Link href="https://hackclub.com/how-to-organize-a-hackathon/">Start one</Link>.
		  </Box>
	  </div>
	  <style>
	  {`
		  .info-pane {
			  position: absolute;
			  top: 0; 
			  width: 100vw;
			  z-index: 999;
			  height: fit-content;
			  width: 400px;
			  text-align: left;
			  font-size: 1rem;
			  margin-left: clamp(16px, calc((100vw - 1200px) / 2 + 16px), calc((100vw - 1200px) / 2 + 16px));
		  } 
		  .map-container {
			position: relative;
			height: calc(100vh - 68px);
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
		  .name-and-logo {
			  display: flex;
			  align-items: center;
			  gap: 8px;
		  }
		  .name-and-logo > img {
			  height: 24px;
			  
		  }
		  .l2 {
			  font-size: 8rem;
			  font-weight: 800;
			  margin-block-start: 0.4em;
			  margin-block-end: 0.4em;
			}
		  .upcoming {
		  	height: 36px;
		  	width: 36px;
			border: 2px solid var(--theme-ui-colors-blue);
		  }
		  footer {
			margin-top: 0px!important;
		  }
		  .location {
			  font-weight: 600
	      }
		  
		  .marker .hidden-child{
			  visibility: hidden;
			  position: relative;
			  z-index: 10000;
			  margin-top: 16px;
			  background: var(--theme-ui-colors-sunken);
			  padding: 8px;
			  border-radius: 8px;
			  width: fit-content;
			  color: white;
			  text-decoration: none;
			  background-size: cover;
			  min-width: 200px;
		  }
		  .marker:hover {
			  text-decoration: none;
		  }
		  
		  h3 {
			  margin-block-start: 0px;
			  margin-block-end: 0px;
		  }
		  .marker:hover .hidden-child{
			  visibility: visible;
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
  ).map(x => ({...x, past: false}))
  let previousEvents = orderBy(
	filter(events, e => (new Date(e.end) < new Date())),
	'start',
	'desc'
  ).map( x => ({...x, past: true}))
  let citiesThisPastYear = uniquify([...orderBy(
  	filter(events, e => (new Date(e.end) < new Date() && new Date(e.end) >= new Date().setFullYear(new Date().getFullYear() - 1))),
  	'start',
	'desc'
  ), ...upcomingEvents].map(x => x.city))
  return { props: { events: [ ...upcomingEvents, ...previousEvents ], citiesThisPastYear }, revalidate: 1 }
}