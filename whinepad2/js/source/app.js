/* @flow */

'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Whinepad from './components/Whinepad';
import schema from './schema';

let data: Array<Object>;
const storage: ?string = localStorage.getItem('data');
if (!storage) {
  data = [{}];
  schema.forEach(item => data[0][item.id] = item.sample);      
} else {
  data = JSON.parse(storage);
}

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo/> Welcome to Whinepad!
    </div>
    <Whinepad schema={schema} initialData={data} />
  </div>,
  document.getElementById('pad')
);
