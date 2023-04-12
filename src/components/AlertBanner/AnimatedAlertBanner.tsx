import styled from '@emotion/native';
import React, {useEffect, useMemo, useRef} from 'react';
import {Animated} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State as RNGHState,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AlertBannerContent} from './AlertBannerContent';
import {bannerContainerStyles} from './styles';
import {EXIT_OFFSET_PX, FLING_LIMIT} from './config';

export const AnimatedAlertBanner = ({
  setVisibility,
}: {
  setVisibility: (to: boolean) => void;
}) => {
  const {top} = useSafeAreaInsets();
  const positionX = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(-500)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const slideIn = Animated.timing(positionY, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  });

  const slideOut = Animated.timing(positionX, {
    toValue: 1000,
    duration: 500,
    useNativeDriver: true,
  });

  const onGestureEvent = useMemo(
    () =>
      Animated.event([{nativeEvent: {translationX: positionX}}], {
        useNativeDriver: true,
      }),
    [positionX],
  );

  const onHandlerStateChange = useMemo(() => {
    const changeOpacity = (to: number) =>
      Animated.timing(opacity, {
        toValue: to,
        duration: 100,
        useNativeDriver: true,
      });

    const animateXPosition = (to: number, duration = 500) =>
      Animated.timing(positionX, {
        toValue: to,
        duration: duration,
        useNativeDriver: true,
      });

    return Animated.event(
      [
        {
          nativeEvent: {},
        },
      ],
      {
        useNativeDriver: true,
        listener: (e: PanGestureHandlerStateChangeEvent) => {
          if (e.nativeEvent.state === RNGHState.BEGAN) {
            changeOpacity(0.8).start();
          }
          if (e.nativeEvent.state === (RNGHState.END || RNGHState.CANCELLED)) {
            if (
              e.nativeEvent.velocityX > FLING_LIMIT &&
              e.nativeEvent.translationX > 0
            ) {
              animateXPosition(EXIT_OFFSET_PX).start(() =>
                setVisibility(false),
              );
            } else if (
              e.nativeEvent.velocityX < -FLING_LIMIT &&
              e.nativeEvent.translationX < 0
            ) {
              animateXPosition(-EXIT_OFFSET_PX).start(() =>
                setVisibility(false),
              );
            } else {
              animateXPosition(0, 300).start();
            }
          }
          if (
            e.nativeEvent.state ===
            (RNGHState.END || RNGHState.CANCELLED || RNGHState.FAILED)
          ) {
            changeOpacity(1.0).start();
          }
        },
      },
    );
  }, [opacity, positionX, setVisibility]);

  useEffect(() => {
    slideIn.start();
  }, [positionY, slideIn]);

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <BannerContainer
        top={top}
        style={{
          transform: [{translateY: positionY}, {translateX: positionX}],
          opacity,
        }}>
        <AlertBannerContent
          title="Animated Alert Banner 🍦"
          description="This banner is done without any use of external animation libraries."
          dismissAlert={() => slideOut.start(() => setVisibility(false))}
        />
      </BannerContainer>
    </PanGestureHandler>
  );
};

const BannerContainer = styled(Animated.View)<{top: number}>`
  ${({top}) => bannerContainerStyles(top)}
`;
