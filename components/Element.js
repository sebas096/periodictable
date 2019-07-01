import React from 'react'
import { View, StyleSheet, Image, asset, Animated, Text } from 'react-360'
import { connect } from '../store'

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      hover: false,
      animation: new Animated.Value(0),
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleButtonUp = this.handleButtonUp.bind(this);

  }
  handleEnter() {
    this.setState(
      {
        hover: true
      }
    );
  }
  handleButtonUp = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 50,
    }).start();
  };
  render() {
    return (
      <View>
        {this.props.elementDetails &&
          <View>
            <View style={{ flex: 1, flexDirection: 'row' }}
              onEnter={this.handleEnter}
              onExit={this.handleExit}>
              <Image style={[styles.image]}
                source={asset(this.props.elementDetails.thumbnail)}
              />
            </View>
            <View style={styles.info}>
              <Text style={[styles.white]}>Atomic number</Text>
              <Text style={[styles.white]}>Atomic weight</Text>
            </View>
          </View>}
      </View>
    )
  }
}
const styles = StyleSheet.create({

  image: {
    width: 350,
    height: 350,
    marginBottom: 1,
    marginRight: 1
  },
  container:
  {
    backgroundColor: 'rgba(145, 150, 0, 0.5)',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  element:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: 60,
    alignItems: 'center',

  },
  info:
  {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  text:
  {
    fontSize: 27
  },
  pesoAtomico:
  {
    marginRight: 2
  },
  numeroAtomico:
  {
    marginRight: 2
  },
  imageHover: {
    transform: [
      { scale: [1.1, 1.1, 1.1] }
    ]
  },
  height: {
    backgroundColor: "rgba(255, 0, 0, .5)",
    borderRadius: 16,
  },
  inner: {
    height: "100%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 26,
  },
});

const ConnectedElement = connect(Element);

export default ConnectedElement;