import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('We can render a button', () => {
  it('changes the text after click', () => {

    const button = TestUtils.renderIntoDocument(
      <button
        onClick={ev => ev.target.innerHTML = 'Bye'}>
        Hello
      </button>
    );

    expect(ReactDOM.findDOMNode(button).textContent).toEqual('Hello');
    TestUtils.Simulate.click(button);
    expect(ReactDOM.findDOMNode(button).textContent).toEqual('Bye');
  });
});
