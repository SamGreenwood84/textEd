import React from 'react';
import ReactDOM from 'react-dom';
import { Workbox } from 'workbox-window';
import Editor from './editor'; // Assuming Editor is a React component
import '../css/style.css';

const main = document.querySelector('#main');

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register().then(() => {
    console.log('Service worker registered successfully');
  }).catch((error) => {
    console.error('Service worker registration failed:', error);
  });
} else {
  console.error('Service workers are not supported in this browser.');
}

// Render the Editor component
const renderApp = () => {
  ReactDOM.render(<Editor />, main);
};

// Display a loading spinner while the editor is loading
loadSpinner();

// Call renderApp once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderApp);
