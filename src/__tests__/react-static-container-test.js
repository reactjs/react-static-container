/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails react-core
 */

jest.dontMock('../react-static-container');

describe('StaticContainer', () => {
  var React;
  var StaticContainer;

  var container;

  beforeEach(() => {
    jest.resetModuleRegistry();

    React = require('react');
    StaticContainer = require('../react-static-container');

    container = document.createElement('div');
  });

  it('does not update static content', () => {
    var mockRender = jest.genMockFunction().mockReturnValue(<div />);
    var MyComponent = React.createClass({render: mockRender});

    React.render(<StaticContainer><MyComponent /></StaticContainer>, container);

    expect(mockRender.mock.calls.length).toBe(1);

    React.render(<StaticContainer><MyComponent /></StaticContainer>, container);

    expect(mockRender.mock.calls.length).toBe(1);
  });

  it('allows null children', () => {
    expect(() => {
      React.render(
        <StaticContainer>{null}</StaticContainer>,
        container
      );
    }).not.toThrow();
  });

  it('requires exactly one child', () => {
    expect(() => {
      React.render(<StaticContainer />, container);
    }).toThrow(
      'Invariant Violation: ' +
      'onlyChild must be passed a children with exactly one child.'
    );

    expect(() => {
      React.render(<StaticContainer><a /><a /></StaticContainer>, container);
    }).toThrow(
      'Invariant Violation: ' +
      'onlyChild must be passed a children with exactly one child.'
    );
  });
});

