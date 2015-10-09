/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

jest.dontMock('StaticContainer.react');

var React = require('React');
var ReactDOM = require('ReactDOM');
var StaticContainer = require('StaticContainer.react');

describe('StaticContainer', () => {
  var container;

  beforeEach(() => {
    jest.resetModuleRegistry();

    container = document.createElement('div');
  });

  it('does not update static content', () => {
    var mockRender = jest.genMockFunction().mockReturnValue(<div />);
    var MyComponent = React.createClass({render: mockRender});

    ReactDOM.render(<StaticContainer><MyComponent /></StaticContainer>, container);

    expect(mockRender.mock.calls.length).toBe(1);

    ReactDOM.render(<StaticContainer><MyComponent /></StaticContainer>, container);

    expect(mockRender.mock.calls.length).toBe(1);
  });

  it('allows null children', () => {
    expect(() => {
      ReactDOM.render(
        <StaticContainer>{null}</StaticContainer>,
        container
      );
    }).not.toThrow();
  });

  it('requires exactly one child', () => {
    expect(() => {
      ReactDOM.render(<StaticContainer />, container);
    }).toThrow(
      'Invariant Violation: ' +
      'onlyChild must be passed a children with exactly one child.'
    );

    expect(() => {
      ReactDOM.render(<StaticContainer><a /><a /></StaticContainer>, container);
    }).toThrow(
      'Invariant Violation: ' +
      'onlyChild must be passed a children with exactly one child.'
    );
  });
});
