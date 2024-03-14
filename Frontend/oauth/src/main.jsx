import React from 'react';
// import ReactDOM, { createRoot }from 'react-dom'; // Corrected import statement
import {createRoot} from 'react-dom/client'
import App from './App.jsx';
import './index.css';

import Signin from './components/Google/Signin.jsx';



createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <App>
      <Signin />
    </App>
  </React.StrictMode>,


);