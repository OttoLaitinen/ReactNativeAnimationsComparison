import styled from '@emotion/native';
import React, {useState} from 'react';
import {Button, StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import AnimatedAlertBanner from './components/AlertBanner/AnimatedAlertBanner';
import ReanimatedAlertBanner from './components/AlertBanner/ReanimatedAlertBanner';

function App(): JSX.Element {
  const [renderAnimatedBanner, setRenderAnimatedBanner] = useState(false);
  const [renderReanimatedBanner, setRenderReanimatedBanner] = useState(false);
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />

      <StyledSafeAreaView>
        {renderAnimatedBanner && (
          <AnimatedAlertBanner setVisibility={setRenderAnimatedBanner} />
        )}
        {renderReanimatedBanner && (
          <ReanimatedAlertBanner setVisibility={setRenderReanimatedBanner} />
        )}

        <PageContainer>
          <ButtonContainer>
            <Button
              title="Animated"
              onPress={() => setRenderAnimatedBanner(true)}
            />
            <Button
              title="Reanimated"
              onPress={() => setRenderReanimatedBanner(true)}
            />
          </ButtonContainer>
        </PageContainer>
      </StyledSafeAreaView>
    </SafeAreaProvider>
  );
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`;

const PageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
  border-radius: 16px;
  gap: 8px;
  padding: 16px;
`;

export default App;
