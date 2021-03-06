import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { setAlarmDuration } from "../actions/SoundActions";
import SoundScroller from "./SoundScroller";
import { sleepSounds } from "../constants";
import { color } from "../StyleVariables";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${color.modalGrey};
  width: 100%;
  height: 100%;
`;
const PresetsContainer = styled.View`
  display: flex;
  flex: 1;
  width: 400px;
  margin-top: 30px;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Presets = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Info = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  width: 300px;
`;
const Duration = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  height: 100px;
`;
const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 300px;
`;
const Button = styled.View`
  border-radius: 30px;
  background-color: ${color.universalWhite};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const Button2 = styled.View`
  border-radius: 30px;
  background-color: ${color.universalWhite};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(83, 86, 91);
  margin: 10px;
`;
const Title = styled.Text`
  font-size: 12;
  color: white;
  margin-bottom: 5px;
  flex-wrap: nowrap;
`;
class AlarmSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSound: "default",
      value: this.props.alarmDuration
    };
  }

  render() {
    return (
      <Container>
        <PresetsContainer>
          <Title>Select Alarm Sound</Title>
          <Presets>
            <SoundScroller
              data={sleepSounds}
              onPick={sound => this.setState({ selectedSound: sound })}
            />
          </Presets>
        </PresetsContainer>
        <Duration>
          <Title>Duration</Title>

          <Slider
            minimumTrackTintColor="rgb(202,207,218)"
            maximumTrackTintColor="#181818CC"
            thumbTintColor={color.universalWhite}
            thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
            trackStyle={{ height: 25, borderRadius: 20 }}
            style={{ width: 500, height: 50 }}
            step={1}
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            maximumValue={120}
          />
          <Text style={{ color: "white" }}>{this.state.value}s</Text>
        </Duration>
        <Info>
          {/* placeholder to be replaced when Ario gets us text copy */}
          <Title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Title>
        </Info>
        <ButtonContainer>
          {/* preview functionality not finished, waiting on API connections and audio files*/}
          <Button2>
            <TouchableOpacity onPress={() => this.props.modalClose()}>
              <Text
                style={{
                  padding: 10,
                  color: color.universalWhite,
                  fontSize: 10
                }}
              >
                PREVIEW
              </Text>
            </TouchableOpacity>
          </Button2>
          <Button>
            <TouchableOpacity
              onPress={() => {
                this.props.AlarmDuration(this.state.value);
                this.props.modalClose();
              }}
            >
              <Text style={{ padding: 10, fontSize: 10 }}>DONE</Text>
            </TouchableOpacity>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  modal: state.modal,
  alarmDuration: state.alarmDuration
});
const mapDispatchToProps = dispatch => ({
  AlarmDuration: duration => {
    return dispatch(setAlarmDuration(duration));
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
)(AlarmSettings);
