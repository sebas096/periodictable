import React from "react";
import { VrButton } from "react-360";

export default class GazeButton extends React.Component {
  state = {
    remainingTime: this.props.duration || 3000,
    isGazed: false,
    gazeTimestamp: null
  };
  animationFrame = null;
  componentWillUnmount() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }
  handleEnter = () => {
    const { onEnter } = this.props;
    if (onEnter) {
      onEnter();
    }
    this.setState(
      () => ({
        isGazed: true
      }),
      () => {
        this.animationFrame = window.requestAnimationFrame(this.step);
      }
    );
  };
  handleExit = () => {
    const { duration, onExit } = this.props;
    this.setState(
      () => ({ isGazed: false, remainingTime: duration, gazeTimestamp: null }),
      () => {
        if (onExit) {
          onExit();
        }
      }
    );
  };
  handleClick = () => {
    const { onClick } = this.props;
    this.setState(
      () => ({ isGazed: false, remainingTime: 0, gazeTimestamp: null }),
      () => {
        onClick();
      }
    );
  };
  step = timestamp => {
    const { duration } = this.props;
    const { isGazed, gazeTimestamp } = this.state;
    if (isGazed && !gazeTimestamp) {
      this.setState(state => ({ ...state, gazeTimestamp: timestamp }));
    }
    // at first step, remaining time equals to duration. No need to get gazeTimestamp from state
    const remainingTime = gazeTimestamp
      ? duration + gazeTimestamp - timestamp
      : duration;
    if (isGazed) {
      if (remainingTime >= 0) {
        this.setState(
          () => ({ remainingTime }),
          () => {
            this.animationFrame = window.requestAnimationFrame(this.step);
          }
        );
      } else {
        this.setState(
          () => {
            remainingTime: 0;
          },
          () => {
            this.handleClick();
          }
        );
      }
    } else {
      this.animationFrame = null;
    }
  };
  render() {
    const { onClick, render, children, ...props } = this.props;
    const { remainingTime, isGazed, gazeTimestamp } = this.state;
    return (
      <VrButton
        {...props}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        onClick={this.handleClick}
      >
        { this.props.children }
      </VrButton>
    );
  }
}