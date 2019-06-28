import React from 'react'
import { View, StyleSheet, Image, asset, VrButton, Text, NativeModules } from 'react-360'
import { connect } from '../store'

class Flayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateItems: [0, 0, 0],
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate() {
    console.log(this.state.translateItems)
  }
  handleClick() {
    NativeModules.LinkingManager.openURL('https://docs.google.com/forms/d/e/1FAIpQLSd4WeR7KbXtMPnUqOR2dRX2W33KavSAeJIhly-1-nu0RFAtAw/viewform')
  }

  render() {
    return (
      <View>
        {this.props.elementDetails &&
          <View style={styles.container}>
            <VrButton onClick={this.handleClick} style={styles.button}>
              <Text>Click para la encuesta</Text>
            </VrButton>
            <View style={[styles.flayer]}>
              <Image style={[styles.image]}
                source={asset(this.props.elementDetails.flayer)}
              />
            </View>
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flayer: {
    width: 650,
    height: 650,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  container:
  {
    width: 700,
    height: 850,
  },
  image:
  {
    width: 620,
    height: 620,
    marginBottom: 1,
    marginRight: 1
  },
  button:
  {
    padding: 12,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: 10,
    height: 60,
    width: 220,
    borderRadius: 9,
  }

});

const ConnectedFlayer = connect(Flayer);

export default ConnectedFlayer