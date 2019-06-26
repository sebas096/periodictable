import React from 'react'
import { View, VrButton, StyleSheet, Image, asset, Text, NativeModules } from 'react-360'
import { connect, setElement } from '../store'
import elements from '../elements'
import GazeButton from './GazeButton';
const { AudioModule } = NativeModules;
const WIDTH = 68
const HEIGHT = 68
const DURATION  = 2500


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: true
    }
    this.handleSkip = this.handleSkip.bind(this);
    this.handleHelpClick = this.handleHelpClick.bind(this);
  }
  handleSkip() {
    this.setState({
      tutorial: false
    })
  }
  handleHelpClick() {
    this.setState({
      tutorial: true
    })
  }
  render() {
    return (
      <View>
        {this.state.tutorial ? <Tutorial skip={this.handleSkip} /> : <PeriodicTable help={this.handleHelpClick} />}
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
    ];
    this.periodo = [1, 2, 3, 4, 5, 6, 7];
    this.handleHelpClick = this.handleHelpClick.bind(this);
  }
  handleHelpClick() {
    setElement(0, null);
    this.props.help();
  }
  render() {
    return (
      <View>

        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
          <View style={{ width: WIDTH / 2, height: 7 * HEIGHT, alignItems: "center", marginTop: HEIGHT / 2 + 8 }} >
            {this.periodo.map((p) => {
              return (<Text style={[styles.white, { height: HEIGHT }]}>{p}</Text>)
            })}
          </View>
          {this.periodicTable.map((periodo, index) => {
            return (
              <View key={index} style={{ width: WIDTH, height: periodo.height * HEIGHT, marginTop: (7 - periodo.height) * WIDTH, alignItems: "center" }} >
                <Text style={styles.white}>{index + 1}</Text>
                {elements.filter((element) => {
                  return element.periodo === index
                }).map((element, index2) => {
                  return (<ElementButton key={"KEY" + index + index2} element={element} index={index} />)
                })}
              </View>)
          })
          }
          <GazeButton onClick={this.handleHelpClick}
          duration={DURATION}>
            <View style={styles.buttonHelp}>
              <Text style={{ fontSize: 30 }}>?</Text>
            </View>
          </GazeButton>
          <GazeButton onClick={this.handleHelpClick}
          duration={DURATION}>
            <View style={styles.buttonAbout}>
              <Text style={{ fontSize: 30 }}>A</Text>
            </View>
          </GazeButton>
        </View>
        {<View style={styles.menu2}>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
            {elements.filter((element) => {
              return element.periodo === 18
            }).map((element, index2) => { 
              return (<ElementButton key={"KEY" + index2} element={element} index={index2} />)
            })}
          </View>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
            {elements.filter((element) => {
              return element.periodo === 19
            }).map((element, index2) => {
              return (<ElementButton key={"KEY" + index2} element={element} index={index2} />)
            })}
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
    if (this.props.element.status) {
      AudioModule.playOneShot({
        source: asset('element.mp3'),
      });
      setElement(this.props.index, this.props.element);
    }
  }
  render() {
    const { element } = this.props
    const hover = this.state.hover
    return (
      <GazeButton onEnter={this.handleEnter}
        duration={DURATION}
        onExit={this.handleExit}
        onClick={this.handleClick}>
        <Image style={[styles.image, hover && element.status ? styles.imageHover : null, element.status ? null : styles.disabledImage]}
          source={asset(element.thumbnail)}
        />
      </GazeButton>
    )
  }
}
class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.text = [
      "Welcome to the virtual environment of periodic table, this is an environment designed to help student to improve their chemistry skills. \nYou can move around the whole 360 environment. \nIf you are using a PC, you should click the screen and move \nIf you are using a smartphone you can either move your head around de 360 world or touch the screen and move.",
      "A periodic table is shown, where the brightest elements are those that can be used \nBy clicking on the element, you can move through the virtual environment and you will see how different elements appear related to the selected element, such as a 3d model, an image and a flyer.\n Click on next to see an example",
      "Congratulations\n\n You can move around the 360 environment and you will watch information related to the potassium"
    ];
    this.pages = 0;
    this.state = {
      hover: false,
      text: this.text[0],
      element: false,
      active: 0
    }
    this.handleSkip = this.handleSkip.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.element = {
      name: 'POTASSIUM',
      modelPath: './models/banana/banana.obj',
      texture: "./models/banana/banana.mtl",
      thumbnail: 'Elementos/potasio.png',
      status: true,
      position: 1,
      scaleArray: [
        { scaleX: 2 },
        { scaleY: 2 },
        { scaleZ: 2 },
      ],
      periodo: 0,
      flayer: "",
      information: ''
    }
  }
  handleNext = () => {
    if (this.pages < this.text.length) {
      this.pages += 1;
      if (this.pages == 2) {
        setElement(1, this.element);
      }
      this.setState(
        {
          text: this.text[this.pages],
          active: this.pages
        }
      );
    }
  }
  handleSkip = () => {
    setElement(0, null);
    this.props.skip();
  }
  render() {
    return (
      <View style={[styles.tuturialPanel]}>
        <Text style={[styles.titleTutorialPanel]}>
          Virtual Enviroment of periodic table
        </Text>
        <Text style={[styles.textPanel]}>
          {this.state.text}
        </Text>
        <View style={[styles.tuturialButtons]}>
          <GazeButton style={styles.buttonBox}
            onClick={this.handleSkip}
            duration={DURATION}>
            <Text style={styles.buttonText}>
              Skip
            </Text>
          </GazeButton>
          <GazeButton style={styles.buttonBox}
            duration={DURATION}
            onClick={this.handleNext} >
            <Text style={styles.buttonText}>
              Next
            </Text>
          </GazeButton>
        </View>
        <View style={styles.panelPage}>
          {this.text.map((text, index) => {
            return (
              <View style={[styles.pages, this.state.active == index ? styles.active : null]}>
              </View>)
          })}
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
    //backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingTop: 15,
    marginLeft: WIDTH * 2.5,
    width: WIDTH * 15,
  },
  tuturialPanel:
  {
    padding: 20,
    width: 900,
    height: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  white: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 23,
  },
  tuturialButtons:
  {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: 600,
  },

  titleTutorialPanel:
  {
    fontSize: 30,
    marginTop: 20
  },
  textPanel:
  {
    marginTop: 20
  },
  panelPage:
  {
    marginTop: 30,
    width: 600,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHelp:
  {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: '#DFDFDF',
    opacity: 0.8,
    alignItems: 'center',
    marginLeft: 30
  },
  buttonAbout:
  {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: '#DFDFDF',
    opacity: 0.8,
    alignItems: 'center',
    marginLeft: 5
  },
  pages:
  {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: '#DFDFDF',
    alignItems: 'center',
    marginLeft: 6
  },
  active:
  {
    backgroundColor: '#C3C3C3',
  },
  buttonBox:
  {
    padding: 12,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: 10,
    height: 60,
    width: 90,
    borderRadius: 9,
  },
  buttonText:
  {
    fontSize: 22,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: 1,
    marginRight: 1
  },
  disabledImage: {
    opacity: 0.85
  },
  imageHover: {
    transform: [
      { scale: [1.1, 1.1, 2] }
    ],
  }
});
const ConnectedMenu = connect(Menu);
export default ConnectedMenu;