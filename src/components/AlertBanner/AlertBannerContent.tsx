import styled from '@emotion/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export const AlertBannerContent = ({
  title,
  description,
  dismissAlert,
}: {
  title: string;
  description: string;
  dismissAlert: () => void;
}) => {
  return (
    <Container>
      <TextContainer>
        <BannerTitle>{title}</BannerTitle>
        <BannerText>{description}</BannerText>
      </TextContainer>

      <TouchableOpacity onPress={dismissAlert}>
        <CrossIcon>✕</CrossIcon>
      </TouchableOpacity>
    </Container>
  );
};

const TextContainer = styled.View`
  gap: 4px;
  flex: 1;
`;

const BannerText = styled.Text`
  color: white;
  font-weight: 400;
  line-height: 18px;
`;

const BannerTitle = styled(BannerText)`
  font-weight: 600;
`;

const CrossIcon = styled(BannerText)`
  font-size: 18px;
  font-weight: 900;
`;

const Container = styled.View`
  width: 344px;
  background-color: slategrey;
  justify-content: space-between;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-radius: 4px;
  flex-direction: row;
  gap: 4px;

  elevation: 5;

  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: black;
`;
