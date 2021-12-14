import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: calc(-200px + -100px);
  position: absolute;
  width: 100%;
`

const StyledContainer = styled.div`
  align-items: center;
  background: #2C27FF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  width: 533px;
`

const StyledTitleText = styled.p`
  color: #F9E000;
  font-family: 'SuisseIntl';
  font-size: 25px;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.05em;
  line-height: 32px;
  text-align: center;
  text-transform: uppercase;
`

const StyledTimeText = styled.p`
  color: #F9E000;
  font-family: 'OggText';
  font-size: 60px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.05em;
  line-height: 55px;
  text-align: center;
  text-transform: uppercase;
`


const calculateTimeLeft = (eventStartDate) => {
  const difference = +new Date(eventStartDate) - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
};

const Timer = (props) => {
  const { currentEventPhase } = props;
  const { config } = useSelector((state) => state.config);
  const targetDate = currentEventPhase == 1 ? config.EVENT_START_DATE : config.EVENT_END_DATE;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
  });

  const getFormattedTime = (_time) => {
    if (+_time < 10) {
      return `0${_time}`
    }

    return _time;
  }

  const getTitleText = () => {
    switch(currentEventPhase) {
      case 1:
        return 'Minting starts in:'
      case 2:
        return 'Minting ends in:'
      case 3:
        return 'Minting ended on:'
      default:
        return ''
    }
  }

  const getTimeText = () => {
    switch(currentEventPhase) {
      case 1:
      case 2:
        return `${getFormattedTime(timeLeft.days)}:${getFormattedTime(timeLeft.hours)}:${getFormattedTime(timeLeft.minutes)}:${getFormattedTime(timeLeft.seconds)}`
      case 3:
        return `${new Date(config.EVENT_END_DATE).toLocaleDateString('en-GB').replace(/\//g, '.')}`
      default:
        return ''
    }
  }

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTitleText>{getTitleText()}</StyledTitleText>
        <StyledTimeText>{getTimeText()}</StyledTimeText>
      </StyledContainer>
    </StyledWrapper>
  )
};

export default Timer;
