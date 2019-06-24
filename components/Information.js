import React from 'react'
import { View, VrButton, StyleSheet, Image, asset, Text, TextInput, WebView } from 'react-360'
import { connect, setElement } from '../store'
import elements from '../elements'


class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      hover: false
    }
    //this.justify = this.justify.bind(this);
    this.texto =
      {
        text: "Se encuentra naturalmente a menudo en áreas volcánicas, también, se encuentra ampliamente en muchos minerales, incluyendo pirita de hierro, galena, yeso y sales de Epsom. Es el séptimo elemento más abundante en el cuerpo. Está involucrado en numerosos procesos bioquímicos en estados de oxidación. Es absorbido como sulfato del suelo (o agua de mar) por las plantas y las algas. Se utiliza para hacer dos de los aminoácidos esenciales necesarios para hacer proteínas."
      }
    this.element = {
      name: 'Azufre',
      modelPath: '/models/huevo/huevo.obj',
      thumbnail: 'azufre.png',
      scaleArray: [
        { scaleX: 0.2 },
        { scaleY: 0.2 },
        { scaleZ: 0.2 },
      ]
    }
  }
  // justify = (str, len) => {
  // var re = RegExp("(?:\\s|^)(.{0," + len + "})(?=\\s|$)", "g");
  // var res = [];
  // var finalResult = [];
  // while ((m = re.exec(str)) !== null) {
  //   res.push(m[1]);
  // }
  // for (var i = 0; i < res.length - 1; i++){    
  //   if(res[i].indexOf(' ') != -1){  
  //     while(res[i].length < len){      
  //       for(var j=0; j < res[i].length-1; j++){
  //         if(res[i][j] == ' '){
  //           res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
  //           if(res[i].length == len) break;
  //           while(res[i][j] == ' ') j++;
  //         }
  //       }
  //     }      
  //   }    
  //   finalResult.push(res[i]);    
  // }
  // finalResult.push(res[res.length - 1]);
  // return finalResult.join('\n');

  // return res.join("\n");

  textJustification(str, L) {
    words = str.split(' ');
    let lines = [], index = 0;

    while (index < words.length) {
      let count = words[index].length;
      let last = index + 1;

      while (last < words.length) {
        if (words[last].length + count + 1 > L) break;
        count += words[last].length + 1;
        last++;
      }

      let line = "";
      let difference = last - index - 1;

      // if we're on the last line or the number of words in the line is 
      // 1, we left justify
      if (last === words.length || difference === 0) {
        for (let i = index; i < last; i++) {
          line += words[i] + " ";
        }

        line = line.substr(0, line.length - 1);
        for (let i = line.length; i < L; i++) {
          line += " ";
        }
      } else {
        // now we need to middle justify, which is putting equal amount 
        // of spaces between words
        let spaces = (L - count) / difference;
        let remainder = (L - count) % difference;

        for (let i = index; i < last; i++) {
          line += words[i];

          if (i < last - 1) {
            let limit = spaces + ((i - index) < remainder ? 1 : 0)
            for (let j = 0; j <= limit; j++) {
              line += " ";
            }
          }
        }
      }
      lines.push(line);
      index = last;
    }
    return lines.join("\n");
  }
  handleEnter = () => {
    this.setState({
      hover: true
    })
  }
  handleExit = () => {
    this.setState({
      hover: false
    })
  }
  componentDidUpdate() {
  }
  render() {
    return (
      <View>
        {this.props.elementDetails &&
          <View style={[styles.informationView, this.state.hover ? styles.viewHover : null]}
            onEnter={this.handleEnter}
            onExit={this.handleExit}
          >
            <Text style={[styles.title, this.state.hover ? styles.titleHover : null]}>
              {this.props.elementDetails.name}
            </Text>
            <Text style={[styles.informationText, this.state.hover ? styles.textHover : null]}>
              {this.textJustification(this.props.elementDetails.information, 50)}
            </Text>
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  informationView: {
    width: 640,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    padding: 5
  },
  informationText:
  {
    fontSize: 28,
    color: "#FFF",
  },
  viewHover:
  {
    width: 630 * (1 + 0.4),
    height: 640 * (1 + 0.4),
  },
  textHover:
  {
    fontSize: 28 * (1 + 0.4),
  },
  title:
  {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 38
  },
  titleHover:
  {
    fontSize: 40 * (1 + 0.4)
  }
});
const ConnectedInformation = connect(Information);
export default ConnectedInformation;