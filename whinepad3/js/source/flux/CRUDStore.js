/* @flow */

import {EventEmitter} from 'fbemitter';

let data;
let schema;
const emitter = new EventEmitter();

const CRUDStore = {
  
  init(initialSchema: Array<Object>) {
    schema = initialSchema;
    const storage = 'localStorage' in window
      ? localStorage.getItem('data')
      : null;

    if (!storage) {
      data = [{}];
      schema.forEach(item => data[0][item.id] = item.sample);      
    } else {
      data = JSON.parse(storage);
    }
  },

  getData(): Array<Object> {
    return data;
  },
  
  getSchema(): Array<Object> {
    return schema;
  },
  
  setData(newData: Array<Object>, commit: boolean = true) {
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
    return data.length;
  },
  
  getRecord(recordId: number): ?Object {
    return recordId in data ? data[recordId] : null;
  },
  
};

export default CRUDStore
