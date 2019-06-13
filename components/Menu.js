import React from 'react'
import { View, VrButton, StyleSheet, Image, asset, Text, TextInput } from 'react-360'
import { connect, setElement } from '../store'
import elements from '../elements'
const WIDTH = 65
const HEIGHT = 65

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: true
    }
    this.handleSkip = this.handleSkip.bind(this);
  }
  handleSkip() {
    this.setState({
      tutorial: false
    })
  }
  render() {
    return (
      <View>
        {this.state.tutorial ? <Tutorial skip={this.handleSkip} /> : <PeriodicTable />}
      </View>
    )
  }
}
class PeriodicTable extends React.Component {
  constructor(props) {
    super(props);
    this.periodicTable = [
      { height: 7 },
      { height: 6 },
      { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 }, { height: 4 },
      { height: 6 }, { height: 6 }, { height: 6 }, { height: 6 }, { height: 6 },
      { height: 7 },
    ]
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
          {this.periodicTable.map((periodo, index) => {
            return (
              <View key={index} style={{ width: WIDTH, height: periodo.height * HEIGHT, marginTop: (7 - periodo.height) * WIDTH }} >
                <Text>{index + 1}</Text>
                {elements.filter((element) => {
                  return element.periodo === index
                }).map((element, index2) => {
                  return (<ElementButton key={"KEY" + index + index2} element={element} index={index} />)
                })}
              </View>)
          })
          }
        </View>
        {<View style={styles.menu2}>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
          </View>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>

          </View>
        </View>}
      </View>
    )
  }
}

class ElementButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      

    }
    this.handleEnter = this.handleEnter.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleEnter() {
    this.setState({
      hover: true
    })
  }
  handleExit() {
    this.setState({
      hover: false
    })
  }
  handleClick() {
    setElement(this.props.index, this.props.element);
  }
  render() {
    const { element } = this.props
    const hover = this.state.hover
    return (
      <VrButton onEnter={this.handleEnter}
        onExit={this.handleExit}
        onClick={this.handleClick}>
        <Image style={[styles.image, hover && element.status ? styles.imageHover : null, element.status ? null : styles.disabledImage]}
          source={asset(element.thumbnail)}
        />
      </VrButton>
    )
  }
}

class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.text = [
      "This is a tutorial about how to play with the 360 enviroment of periodic table You can move around the whole 360 enviroment If yor are using a PC you should click the screen and move If you are using a smarphone you can either move our head around de 360 world or touch the screen and move",
      "This is an example, click on the elements and move around the 360 enviroment unti you find the 3D element"
    ];
    this.state = {
      hover: false,
      text:this.text[0],
      element:false
    }

    this.handleSkip = this.handleSkip.bind(this);
    this.handleNext = this.handleNext.bind(this);
    
    this.element = {
      name: 'POTASSIUM',
      modelPath: './models/banana/banana.obj',
      texture:"./models/banana/banana.mtl",
      thumbnail: 'Elementos/potasio.png',
      status:true,
      position:1,
      scaleArray: [
        {scaleX: 2},
        {scaleY: 2},
        {scaleZ: 2},
      ],
      periodo:0,
      flayer:"",
      information:''
    }
    
  }
  handleNext = () => 
  {
    this.setState(
      {
        text:this.text[1],
        element:true
      }
    );
    setElement(1, this.element);
  }
  handleSkip = () => {
    setElement(0,null);
    this.props.skip();
  }
  render() {
    return (
      <View style={[styles.tuturialPanel]}>
        <Text>
          Virtual Enviroment of periodic table
        </Text>
        <Text>
          { this.state.text } 
        </Text>
        <View>
          <VrButton style={styles.buttonBox}
            onClick={this.handleNext} >
            <Text style={styles.buttonText}>
              Next
            </Text>
          </VrButton>
          <VrButton style={styles.buttonBox}
            onClick={this.handleSkip}>
            <Text style={styles.buttonText}>
              Skip
            </Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 30,
  },
  menu2:
  {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingTop: 30,
    marginLeft: WIDTH * 2,
    width: WIDTH * 14,
  },
  tuturialPanel:
  {
    width: 800,
    height: 450,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',   
    justifyContent: 'center',
  },
  titleTutorialPanel:
  {

  },
  buttonBox:
  {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    alignItems: 'center'
  },
  buttonText:
  {
    fontSize: 30,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: 1,
    marginRight: 1
  },
  disabledImage: {
    opacity: 0.8
  },
  imageHover: {
    transform: [
      { scale: [1.1, 1.1, 2] }
    ],
  }
});

const ConnectedMenu = connect(Menu);

export default ConnectedMenu;
