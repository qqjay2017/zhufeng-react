
import ReactDOM from 'react-dom/client';

import App from './App';
import { render } from './jsxHandle';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


// root.render(
  

//    <App />
   

// );

render(
  

 <div className='wrap'>
   <App />
 </div>,
  document.getElementById('root') 
  

);
