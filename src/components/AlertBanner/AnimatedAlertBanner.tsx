import styled from '@emotion/native';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AlertBannerContent from './AlertBannerContent';

const AnimatedAlertBanner = ({
  setVisibility,
}: {
  setVisibility: (to: boolean) => void;
}) => {
  const {top} = useSafeAreaInsets();
  const position = useRef(new Animated.ValueXY({x: 0, y: -500})).current;

  useEffect(() => {
    const slideIn = () => {
      Animated.timing(position, {
        toValue: {x: 0, y: 0},
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    slideIn();
  }, [position]);

  const slideOut = () => {
    Animated.timing(position, {
      toValue: {x: 1000, y: 0},
      duration: 500,
      useNativeDriver: true,
    }).start(() => setVisibility(false));
  };

  return (
    <BannerContainer
      top={top}
      style={{transform: [{translateY: position.y}, {translateX: position.x}]}}>
      <AlertBannerContent
        title="Animated Alert Banner"
        description="This is done without any use of external animation libraries. 🍦"
        dismissAlert={() => slideOut()}
      />
    </BannerContainer>
  );
};

const BannerContainer = styled(Animated.View)<{top: number}>`
  position: absolute;
  top: ${({top}) => top};

  width: 344px;
  background-color: slategrey;
  justify-content: space-between;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 4px;
  flex-direction: row;
  gap: 4px;
`;

export default AnimatedAlertBanner;
