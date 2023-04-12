import styled from '@emotion/native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SlideInUp,
  SlideOutRight,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AlertBannerContent} from './AlertBannerContent';
import {bannerContainerStyles} from './styles';
import {EXIT_OFFSET_PX, FLING_LIMIT} from './config';

export const ReanimatedAlertBanner = ({
  setVisibility,
}: {
  setVisibility: (to: boolean) => void;
}) => {
  const {top} = useSafeAreaInsets();

  const isPressed = useSharedValue(false);
  const startXOffset = useSharedValue(0);
  const xOffset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: xOffset.value}],
      opacity: isPressed.value ? 0.8 : 1,
    };
  });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      xOffset.value = e.translationX + startXOffset.value;
    })
    .onEnd(e => {
      if (e.velocityX > FLING_LIMIT && e.translationX > 0) {
        xOffset.value = withTiming(EXIT_OFFSET_PX, {duration: 500}, () =>
          runOnJS(setVisibility)(false),
        );
        runOnJS(setVisibility)(false);
      } else if (e.velocityX < -FLING_LIMIT && e.translationX < 0) {
        xOffset.value = withTiming(-EXIT_OFFSET_PX, {duration: 500}, () =>
          runOnJS(setVisibility)(false),
        );
      } else {
        xOffset.value = withTiming(startXOffset.value, {duration: 300});
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={panGesture}>
      <BannerContainer
        top={top}
        entering={SlideInUp.duration(500)}
        exiting={SlideOutRight.duration(500)}
        style={animatedStyles}>
        <AlertBannerContent
          title="Reanimated Alert Banner ✨"
          description="This banner uses the Reanimated library! It was so easy to use! 🐎"
          dismissAlert={() => setVisibility(false)}
        />
      </BannerContainer>
    </GestureDetector>
  );
};

const BannerContainer = styled(Animated.View)<{top: number}>`
  ${({top}) => bannerContainerStyles(top)}
`;
