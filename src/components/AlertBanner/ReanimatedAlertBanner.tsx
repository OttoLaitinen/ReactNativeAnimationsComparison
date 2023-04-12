import styled from '@emotion/native';
import React from 'react';
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutRight,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AlertBannerContent from './AlertBannerContent';

const ReanimatedAlertBanner = ({
  setVisibility,
}: {
  setVisibility: (to: boolean) => void;
}) => {
  const {top} = useSafeAreaInsets();

  return (
    <BannerContainer
      top={top}
      entering={SlideInUp.duration(500)}
      exiting={SlideOutRight.duration(500)}>
      <AlertBannerContent
        title="✨ Reanimated Alert Banner ✨"
        description="This banner uses the Reanimated library! Look how awesome it is! 🐎"
        dismissAlert={() => setVisibility(false)}
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

export default ReanimatedAlertBanner;
