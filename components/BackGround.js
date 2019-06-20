import React from 'react';
import {connect} from '../store';
import {View, AmbientLight, PointLight, Animated, asset} from 'react-360';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class BackGround extends React.Component {
    animTrashcanRotY = new Animated.Value(0);

    state = {
        isTrashcanJive: false,
        scaleTrashcan: 0,
        scalePencilBench: 0,
        scaleDoor: 0,
        translateItems: [0, 0, 0]
    };

/*     handleTrashcan = () => {
        
        // Step 1: spin trashcan
        if (!this.state.isTrashcanJive){
            play3DAudio('TrashcanJive.MP3', 1, [2, -1, -2]);
            this.setState({isTrashcanJive: true});
            Animated.timing(this.animTrashcanRotY, {toValue: 360, duration: 6000}).start();
            return;
        }

        // Step 2: spew trashcan
        if (isAction(this.props.action, '')){
            play3DAudio('TrashcanRebuke.MP3', 0.6, [2, -1, -2]);
            setAction(Action.TrashcanSpew);
            return;
        }

        // Step 4: jam trashcan
        if (isAction(this.props.action, Action.PencilSeek)){
            setAction(Action.TrashcanJam);
            this.setState({translateItems: [0, 0, 0]});
        }
    }; */

 /*    handlePencilBench = () => {

        // Step 3: seek pencil
        if (isAction(this.props.action, Action.TrashcanSpew)){
            setAction(Action.PencilSeek);
            this.setState({translateItems: [6.0, 1.85, 1.9]});
        }
    };

    handleDoor = () => {

        // Step 5: zone Tikjo
        if (isAction(this.props.action, Action.TrashcanJam)){
            setAction('');
            setZone(Zone.Tikjo);
        }
    }; */
    render() {
        return ( 
            <View>
                <AmbientLight intensity={ 0.6 } />
                <PointLight 
                    distance={ 10 }
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [1.5 + this.state.translateItems[0], 3.5, 2 + this.state.translateItems[2]]}
                        ]
                    }} 
                />
                <Entity
                    source={{
                        obj: asset('Lypzo.obj'),
                        mtl: asset('Lypzo.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [this.state.translateItems[0], -3, this.state.translateItems[2]]}
                        ]
                    }}
                />
            </View>
        );
    };
};
const ConnectedBackGround = connect(BackGround);
export default ConnectedBackGround;
