import { AppRegistry } from 'react-360';
import Model from './components/Model'
import Element from './components/Element'
import Information from './components/Information'
import Menu from './components/Menu'
import BackGround from './components/BackGround'
import * as Store from './store'
import Flayer from './components/Flayer';
Store.initialize()

AppRegistry.registerComponent('menu', () => Menu);
AppRegistry.registerComponent('element', () => Element);
AppRegistry.registerComponent('model', () => Model);
AppRegistry.registerComponent('information', () => Information);
AppRegistry.registerComponent('flayer', () => Flayer);
// AppRegistry.registerComponent('background', () => BackGround);


