/* @flow */

import {EventEmitter} from 'fbemitter';
import {List} from 'immutable';

let data: List<Object>;
let schema;
const emitter = new EventEmitter();

const CRUDStore = {
  
  init(initialSchema: Array<Object>) {
    schema = initialSchema;
    const storage = 'localStorage' in window
      ? localStorage.getItem('data')
      : null;
    if (!storage) {
      let initialRecord = {};
      schema.forEach(item => initialRecord[item.id] = item.sample);
      data = List([initialRecord]);
    } else {
      data = List(JSON.parse(storage));
    }
  },

  getData(): List<Object> {
    return data;
  },
  
  getSchema(): Array<Object> {
    return schema;
  },
  
  setData(newData: List<Object>, commit: boolean = true) {
    data = newData;
    if (commit && 'localStorage' in window) {
      localStorage.setItem('data', JSON.stringify(newData));      
    }
    emitter.emit('change');
  },
  
  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },
  
  getCount(): number {
    return data.count();
  },
  
  getRecord(recordId: number): ?Object {
    return data.get(recordId);
  },
  
};

export default CRUDStore
