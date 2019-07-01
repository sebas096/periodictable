import React from 'react'
import { View, VrButton, StyleSheet, Image, asset, Text, NativeModules } from 'react-360'
import { connect, setElement } from '../store'
import elements from '../elements'
import GazeButton from './GazeButton';
const { AudioModule } = NativeModules;
const WIDTH = 68
const HEIGHT = 68
const DURATION = 2500


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
      "Welcome to the virtual environment of periodic table, this is an environment designed to help students to improve their chemistry skills. \nYou can move on around the whole 360 environment. \nIf you are using a PC, you should click on the screen and move on\nIf you are using a smartphone you can either move your smartphone around de 360 world" 
      + "or touch the screen and move on\n",
      "If you are using a virtual reality device (HDM) or your phone has activated the  virtual reality option and you have an extension like Google Cardboard, you can move your head around the virtual environment. \nalso, you can use the  raycaster to  select the elements of the virtual environment",
      "A periodic table is shown, where the brightest elements are those that might be used \nBy clicking on the element, you can move on through the virtual environment and you will watch how these elements can be associated to the selected element, such as a 3d model, an image and a flyer.\n continue to watch an example",
      "Congratulations\n\n You can move on around the 360 environment and you will watch information related to the potassium"
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
    this.handleBack = this.handleBack.bind(this);

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
    if (this.pages < this.text.length - 1) {
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
  handleBack = () => {
    if (this.pages > 0) {
      this.pages -= 1;
      if (this.pages != 2) {
        setElement(0, null);
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
        <View style={{ height: 15, width: 850, flexDirection: 'row', justifyContent: 'flex-end', }}>
          <GazeButton
            duration={DURATION}
            onClick={this.handleSkip}>
            <Text>
              X
          </Text>
          </GazeButton>
        </View>
        <Text style={[styles.titleTutorialPanel]}>
          Virtual Enviroment of Periodic Table
        </Text>
        <Text style={[styles.textPanel]}>
          {this.state.text}
        </Text>
        <View style={[styles.tuturialButtons]}>
          <GazeButton style={styles.buttonBox}
            duration={DURATION}
            onClick={this.handleBack}>
            <Image source={asset("Flecha_left.png")} style={{ width: 60, height: 45 }} />
          </GazeButton>
          <GazeButton style={styles.buttonBox}
            duration={DURATION}
            onClick={this.handleNext} >
            <Image source={asset("Flecha.png")} style={{ width: 60, height: 45 }} />
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
    padding: 3,
    width: 900,
    height: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 400,
  },

  titleTutorialPanel:
  {
    fontSize: 33,
    marginTop: 23,
    fontWeight: "bold"
  },
  textPanel:
  {
    marginTop: 20,
    width: 840,
    height:145
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
    backgroundColor: '#808080',
  },
  buttonBox:
  {
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: 10,
    height: 50,
    width: 75,
    borderRadius: 9,
  },
  buttonText:
  {
    fontSize: 20,
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
