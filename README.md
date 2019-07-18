# react-static-container

Renders static content efficiently by allowing React to short-circuit the
reconciliation process. This component should be used when you know that a
subtree of components will never need to be updated.

Typically, you will not need to use this component and should opt for normal
React reconciliation.

## Installation

```sh
npm install react-static-container
# or
yarn add react-static-container
```

## Usage

```js
const StaticContainer = require('react-static-container');

const someValue = ...; // We know for certain this value will never change.

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.value}
        <StaticContainer>
          <MyOtherComponent value={someValue} />
        </StaticContainer>
      <div>
    );
  }
 );
```

`StaticContainer` also takes a `shouldUpdate` prop as an escape hatch, allowing granular updates.
