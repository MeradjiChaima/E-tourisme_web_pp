
import React, { useEffect} from 'react';
import {RiMapPin2Fill } from 'react-icons/ri';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom'
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css'
import { useParams } from 'react-router-dom';
import places from './places.json'
const MapPage =() => {



/****************Map************************* */
const { latitude, longitude } = useParams(); 

    useEffect(() => {
    mapboxgl.accessToken ='pk.eyJ1IjoiaGV5aGVsbG8yIiwiYSI6ImNsaGhyeDVzMDAweWwzdHBpMGdlZzExemIifQ.7CslLG2pjB9QcvndD9ilCQ';  
    const map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 10
    });
   
/****************Marker**************** */
places.forEach (place => {
    const markerElement = document.createElement('div');
    ReactDOM.render(<RiMapPin2Fill/>, markerElement);
    markerElement.className ='marker';
    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([place.longitude, place.latitude])
      .addTo(map);



/***************Popup*********************************************************/

    const popup = new mapboxgl.Popup({ closeButton: true , popupContent:true })
      popup.addClassName='popupglobal'; 
            /*Function onclick of the marker */
    function onMarkerClick() {
      marker.setPopup(popup);
    }
    marker.getElement().addEventListener('click', onMarkerClick);


    popup.on('open', () => {
    const popupContent = document.createElement('div');
    popupContent.className='popup-content'; 
    popupContent.innerHTML=`<h3>Bienvenue dans ${place.name}</h3> <button>Details</button>`; 
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close-button';
    closeButton.innerHTML = 'x';
    closeButton.addEventListener('click', () => {
      popup.remove();
    });
    popup.setDOMContent(popupContent ,closeButton );
    
  });


}) 
/********************Recherche******************************** */
const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results');
function handleSearch() {
  const recherche = searchInput.value.toLowerCase().trim();
  searchResultsContainer.innerHTML = '';
  filteredResultsContainer.innerHTML = '';
  places.forEach(place => {
    if (place.name.toLowerCase().includes(recherche)) {
      const resultItem = document.createElement('div');
      resultItem.innerHTML = `<h3>${place.name}</h3>`;
      resultItem.className='places'
      searchResultsContainer.appendChild(resultItem);
    }
  });
}
searchInput.addEventListener('input', handleSearch);


/*******************Filtrage************************ */
// Get the filtered results container element
const typeFilter = document.getElementById('type-filter');
console.log('helloooo');
console.log(typeFilter);
const filteredResultsContainer = document.getElementById('filtered-results');
function handlefilter() {
  const selectedTheme = typeFilter.value;
  filteredResultsContainer.innerHTML = '';
  searchResultsContainer.innerHTML = '';
  places.forEach(place => {
    if (place.theme=== selectedTheme ){
    const resultItem = document.createElement('div');
    resultItem.innerHTML = `<h3>${place.name}</h3>`;
    resultItem.className='places'
    filteredResultsContainer.appendChild(resultItem);
  }});
}
typeFilter.addEventListener('change', handlefilter);
/************************************************************** */




});
    return ( 
    <div className='map-page'>
      <div className='map-page-content'>
        <div className='map-page-recherche'>

               <input type="text" id="search-input" placeholder="Rechercher place d'interet ...."/>
               <select id='type-filter'>
               <option value="">Tous les themes</option>
               <option value="histoire">Histoire</option>
               <option value="nature">Nature</option>
               </select>
               <div id="search-results"></div>
               <div id="filtered-results"></div>
        </div>
      </div>
      <div id="mapbox" className='the-map'/> 
    
    </div>) ;
  }


export default MapPage;



