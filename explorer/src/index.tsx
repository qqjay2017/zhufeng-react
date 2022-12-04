import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JsxHandle from './jsxHandle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(<div>
 <div>2</div>
 <div>3</div>
</div>);

root.render(
  <React.StrictMode>
   <div>
    <JsxHandle />
   <App />
   </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
