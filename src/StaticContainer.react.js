/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule StaticContainer.react
 * @typechecks
 * @flow
 */

var React = require('React');

/**
 * Renders static content efficiently by allowing React to short-circuit the
 * reconciliation process. This component should be used when you know that a
 * subtree of components will never need to be updated.
 *
 *   var someValue = ...; // We know for certain this value will never change.
 *   return (
 *     <StaticContainer>
 *       <MyComponent value={someValue} />
 *     </StaticContainer>
 *   );
 *
 * Typically, you will not need to use this component and should opt for normal
 * React reconciliation.
 */
class StaticContainer extends React.Component {

  shouldComponentUpdate(nextProps: Object): boolean {
    return !!nextProps.shouldUpdate;
  }

  render() {
    var child = this.props.children;
    if (child === null || child === false) {
      return null;
    }
    return React.Children.only(child);
  }

}

module.exports = StaticContainer;
