# React Native Animations Comparison

This project is a very quick case study comparing two ways of handling animations in React Native:

1. React Native's built-in [Animated](https://reactnative.dev/docs/animated)-library
2. The [Reanimated](https://docs.swmansion.com/react-native-reanimated/)-library by Software Mansion

The purpose of this comparison is to help reason decisions on which library should be used to handle animations in my work and hobby projects. 
The comparison was conducted by implementing the same animated component using both beforementioned libraries.

## Task description

The task given in this comparison case study was to implement an animated alert banner component which has the following requirements:

1. Animates into the screen after a user action
2. Animates out of the screen when alert's close-button is pressed
3. Can be dragged horizontally by the user
4. Visually communicates to the user that they're successfully dragging the alert component
5. Animates back to the original position if the user gently stops dragging the alert component
6. If the user flings the alert quickly to either direction the alert is animated out of the screen to the direction of the fling

## Technical Specifications

To be able to detect and act upon user's gestures an additional library called [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) (also by Software Mansion) was used.

Other software libraries or packages and their respective versions can be found from the `package.json` file.

## Video

Video showing how the completed alert banners function.

https://user-images.githubusercontent.com/33544222/231484696-9d45e2e4-0376-477b-a924-74b8e64a9463.mov

## Code

Please see [`AnimatedAlertBanner.tsx`](https://github.com/OttoLaitinen/ReactNativeAnimationsComparison/blob/main/src/components/AlertBanner/AnimatedAlertBanner.tsx) and [`ReanimatedAlertBanner.tsx`](https://github.com/OttoLaitinen/ReactNativeAnimationsComparison/blob/main/src/components/AlertBanner/ReanimatedAlertBanner.tsx) for the relevant code.

To make comparing the two different libraries as fair as possible all non-animation related code was kept as similar as possible.

## Conclusions

Though both libraries were able to achieve the 6 simple requirements given for the alert banner, it is clear for me that the Reanimated library is the superior way to handle animations in a React Native application. 

The API Reanimated gives for handling animations is intuitive and allows for a really simple way of handling gestures together with animations, which shows in the amount of code needing to be written:
only for this rather simple component the Animated-library needed ~60% more lines of code to complete it (78 vs 127). Though the amount of code in itself isn't a perfect metric this kind of difference it is a telling example of how the Reanimated API simplifies things through understandable abstractions.

