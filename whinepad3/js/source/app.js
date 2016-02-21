/* @flow */

'use strict';

import CRUDStore from './flux-imm/CRUDStore';
import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import Whinepad from './components/Whinepad';
import schema from './schema';

CRUDStore.init(schema);

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Welcome to Whinepad!
    </div>
    <Whinepad />
  </div>,
  document.getElementById('pad')
);
