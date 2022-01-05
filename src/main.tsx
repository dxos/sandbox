import React from 'react';
import ReactDOM from 'react-dom';

import { HashIcon } from '@dxos/react-components';

const App = () => {
  return (
    <div>
      <header>
        <HashIcon value='hello' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
