import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: calc(-165px + -125px);
  width: 100%;
`

const StyledContainer = styled.div`
  align-items: center;
  background: #00F436;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  width: 250px;

  > p {
    color: #000000;
    font-family: 'SuisseIntl';
    font-size: 25px;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 0.05em;
    line-height: 32px;
    text-align: center;
    text-transform: uppercase;
  }
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
  const { config } = useSelector((state) => state.config);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(config.EVENT_START_DATE));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(config.EVENT_START_DATE));
    }, 1000);
  });

  const getFormattedTime = (_time) => {
    if (+_time < 10) {
      return `0${_time}`
    }

    return _time;
  } 

  return (
    <StyledWrapper>
      <StyledContainer>
        <p>Minting<br/>starts in</p>
        <p>{getFormattedTime(timeLeft.days)}:{getFormattedTime(timeLeft.hours)}:{getFormattedTime(timeLeft.minutes)}:{getFormattedTime(timeLeft.seconds)}</p>
      </StyledContainer>
    </StyledWrapper>
  )
};

export default Timer;
