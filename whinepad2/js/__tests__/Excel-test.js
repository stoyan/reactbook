jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Excel = require('../source/components/Excel').default;
const schema = require('../source/schema').default;

let data = [{}];
schema.forEach(item => data[0][item.id] = item.sample);

describe('Editing data', () => {
  it('saves new data', () => {
    const callback = jest.genMockFunction();
    const table = TestUtils.renderIntoDocument(
      <Excel 
        schema={schema}
        initialData={data}
        onDataChange={callback} />
    );
    const newname = '$2.99 chuck';
    const cell = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[0];
    cell.dataset = { // hack around the DOM support in Jest
      row: cell.getAttribute('data-row'),
      key: cell.getAttribute('data-key'),
    };
    TestUtils.Simulate.doubleClick(cell);
    cell.getElementsByTagName('input')[0].value = newname;
    TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
    expect(cell.textContent).toBe(newname);
    expect(callback.mock.calls[0][0][0].name).toBe(newname);
  });
  
  it('deletes data', () => {
    const callback = jest.genMockFunction();
    const table = TestUtils.renderIntoDocument(
      <Excel 
        schema={schema}
        initialData={data}
        onDataChange={callback} />
    );

    TestUtils.Simulate.click( // x icon
      TestUtils.findRenderedDOMComponentWithClass(table, 'ActionsDelete')
    );
    TestUtils.Simulate.click( // confirmation dialog
      TestUtils.findRenderedDOMComponentWithClass(table, 'Button')
    );
    expect(callback.mock.calls[0][0].length).toBe(0);
  });
  
});
