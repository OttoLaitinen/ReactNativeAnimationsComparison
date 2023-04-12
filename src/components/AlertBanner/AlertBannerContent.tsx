import styled from '@emotion/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const AlertBannerContent = ({
  title,
  description,
  dismissAlert,
}: {
  title: string;
  description: string;
  dismissAlert: () => void;
}) => {
  return (
    <>
      <TextContainer>
        <BannerTitle>{title}</BannerTitle>
        <BannerText>{description}</BannerText>
      </TextContainer>

      <TouchableOpacity onPress={dismissAlert}>
        <CrossIcon>✕</CrossIcon>
      </TouchableOpacity>
    </>
  );
};

const TextContainer = styled.View`
  gap: 4px;
`;

const BannerText = styled.Text`
  color: white;
  font-weight: 400;
`;

const BannerTitle = styled(BannerText)`
  font-weight: 600;
`;

const CrossIcon = styled(BannerText)`
  font-size: 16px;
  font-weight: 900;
`;

export default AlertBannerContent;
