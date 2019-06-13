import React from 'react'
import { asset, View, Animated, Text } from 'react-360'
import Entity from 'Entity'
import AmbientLight from 'AmbientLight'
import PointLight from 'PointLight'
import { connect } from '../store'
import elements from '../elements'

class Model extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      rotation: 0,
      bounceValue: new Animated.Value(3),
      luz:0
    }
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this)
  }

  componentDidMount(){
    this.rotate()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.elementID !== nextProps.elementID) {
      const bounceValue = this.state.bounceValue
      // animate the character
      const modelConfig = {
        value: bounceValue,
        initial: 0.3,
        toValue: 1,
        speed: 9,
        bounciness: 23
      };

      this.bounce(modelConfig)
    }
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null
    }
  }

    // bounce animation
  bounce({value, initial, toValue, speed, bounciness }) {
    value.setValue(initial);

    Animated.spring(
      value,
      {
        toValue,
        speed,
        bounciness
      }
    ).start();
  }

  rotate() {
    const now = Date.now()
    const delta = now - this.lastUpdate
    this.time++
    this.lastUpdate = now;
    this.setState({
      rotation: this.state.rotation + delta / 10
    })
    this.frameHandle = requestAnimationFrame(this.rotate)
  }
//elementDetails.modelPath
  render() {
    const { rotation } = this.state
    const scale = this.state.bounceValue
    const elementDetails = this.props.elementDetails
    return (
      <View>
        <AmbientLight intensity={1.5} color={'#ffffff'} />
        <PointLight
          intensity={2}
          style={{transform: [{translate: [0, 0,0]}]}}
        />
        <Animated.View style={{transform: [{scale}]}}>
        { elementDetails && <Entity 
            source={{obj: asset(elementDetails.modelPath),mtl: asset(elementDetails.texture)}}  
            style={{
              transform: [{rotateY: rotation}, ...elementDetails.scaleArray]
            }}
            />}
        </Animated.View>
      </View>
    );
  }
};
const ConnectedModel = connect(Model);
export default ConnectedModel;