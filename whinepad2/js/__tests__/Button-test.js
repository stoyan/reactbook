jest
  .dontMock('../source/components/Button')
  .dontMock('classnames')
;

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Button = require('../source/components/Button').default;

describe('Render Button components', () => {
  it('renders <a> vs <button>', () => {
    const button = TestUtils.renderIntoDocument(
      <div>
        <Button>
          Hello
        </Button>
      </div>
    );
    expect(ReactDOM.findDOMNode(button).children[0].nodeName).toEqual('BUTTON');
    
    const a = TestUtils.renderIntoDocument(
      <div>
        <Button href="#">
          Hello
        </Button>
      </div>
    );
    expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
  });
  
  it('allows custom CSS classes', () => {
    const button = TestUtils.renderIntoDocument(
      <div><Button className="good bye">Hello</Button></div>
    );
    const buttonNode = ReactDOM.findDOMNode(button).children[0];
    expect(buttonNode.getAttribute('class')).toEqual('Button good bye');
  });
  
});
