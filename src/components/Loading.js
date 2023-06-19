import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Loader } from '@progress/kendo-react-indicators';
const App = ({type}) => {
  return <div className=' '>
      {/* <div className='col-4'>
        <Loader type="pulsing" />
      </div>
      <div className='col-4'>
        <Loader type="infinite-spinner" />
      </div> */}
      <div className=''>
        <Loader type="converging-spinner" />
      </div>
    </div>;
};
export default App;