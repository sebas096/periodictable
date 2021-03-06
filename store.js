import * as React from 'react';


/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  elementID: 0,
  elementDetails:null
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb()
  }
}
export function initialize() {
  State.elementID = 0
  State.elementDetails =  null;
  updateComponents()
}
export function setElement(value,element) {
  State.elementID = value;
  State.elementDetails = element
  updateComponents();
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      elementID: State.elementID,
      elementDetails: State.elementDetails,
    };

    _listener = () => {
      this.setState({
        elementID: State.elementID,
        elementDetails: State.elementDetails,
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          elementID={this.state.elementID}
          elementDetails={this.state.elementDetails}
        />
      );
    }
  };
}
