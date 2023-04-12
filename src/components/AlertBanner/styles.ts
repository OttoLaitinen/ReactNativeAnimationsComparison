import {css} from '@emotion/native';

export const bannerContainerStyles = (top: number) => css`
  position: absolute;
  top: ${top};

  z-index: 1000;
`;
