import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GameLoading = () => {
  const [timer, setTimer] = useState(3);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    console.log('💕💕💕IS GAME LOADING MOUNTED!💕💕');
    const interval = setInterval(() => {
      if (timer === 0) {
        return clearInterval(interval);
      }
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) setIsOver(true);
  }, [timer]);

  return (
    <Wrapper>
      {isOver || <AnimatedNumber key={timer}>{timer}</AnimatedNumber>}
    </Wrapper>
  );
};

export default GameLoading;

const Wrapper = styled.div`
  z-index: 400;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.flex.center}
  margin:auto;
`;

const AnimatedNumber = styled.div`
  color: ${({ theme }) => theme.colors.light};
  animation: fadeOut 1s linear;
  @keyframes fadeOut {
    0% {
      font-size: 100vw;
      opacity: 1;
    }
    100% {
      opacity: 0;
      font-size: 10vw;
    }
  }
`;
