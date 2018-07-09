import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import ClockScroller from "./ClockScroller";
import { hours, minutes, timeOfDay } from "../constants";
import { setTime, modalOpen, returnHome } from "../actions/TimeActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ClockContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const BarContainer = styled.View`
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const ScrollContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TimeButton = styled.View`
  padding-left: 25px;
`;
const ButtonContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const TimeText = styled.Text`
  font-size: 36px;
`;

class ClockAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHour: "2",
      selectedMinute: "01"
    };
  }
  render() {
    return (
      <ClockContainer>
        <Text>Set Alarm</Text>
        <ScrollContainer>
          <ClockScroller
            data={hours}
            onPick={hour => this.setState({ selectedHour: hour })}
            //value={parseInt(this.state.selectedHour, 10)}
          />
          <Text style={{ fontSize: 40, paddingBottom: 10 }}>:</Text>
          <ClockScroller
            data={minutes}
            onPick={minute => this.setState({ selectedMinute: minute })}
            //value={parseInt(this.state.selectedMinute, 10)}
          />
        </ScrollContainer>
        <ButtonContainer>
          <TouchableOpacity onPress={() => this.props.modalClose()}>
            <TimeButton>
              <Text>Cancel</Text>
            </TimeButton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.setClockData(
                this.state.selectedHour,
                this.state.selectedMinute,
                this.props.modal
              );
              this.props.modalClose();
            }}
          >
            <TimeButton>
              <Text>Set</Text>
            </TimeButton>
          </TouchableOpacity>
        </ButtonContainer>
      </ClockContainer>
    );
  }
}
const mapStateToProps = state => ({
  alarmTime: state.alarmTime,
  wakeTime: state.wakeTime,
  sleepTime: state.sleepTime,
  modal: state.modal
});
const mapDispatchToProps = dispatch => ({
  setClockData: (hour, mins, modal) => {
    return dispatch(setTime(hour, mins, modal));
  },
  modalOpen: component => {
    return dispatch(modalOpen(component));
  },
  modalClose: () => {
    return dispatch(returnHome());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockAdjust);