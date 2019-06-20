import React from 'react'
import { View, StyleSheet, Image, asset, VrButton } from 'react-360'
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
    this.setState({
      translateItems: [30, 10, 10],
    });
  }
  
  render() {
    return (
      <View style={[styles.flayer]}
       onEnter={this.handleClick}>

        {this.props.elementDetails && <Image style={[styles.image]}
          source={asset(this.props.elementDetails.flayer)}
    /> }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flayer: {
    width: 550,
    height: 550,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image:
  {
    width: 550,
    height: 550,
    marginBottom: 1,
    marginRight: 1
  },

});

const ConnectedFlayer = connect(Flayer);

export default ConnectedFlayer