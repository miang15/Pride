import {Dimensions} from 'react-native';

const window = Dimensions.get('window');

export const theme = {
  black: '#000',
  white: '#fff',
  yellow: '#FFE600',
  tabicon: '#EEB401',
  lightyellow: '#FFF385',
  primary: '#6D52A2',
  mediumgray: '#353535',
  darkgray: '#252525',
  secondary: '#452781',
  dullpurple: '#1D1A23',

  text: {
    gray: '#9F9E9E',
    red: '#DE0A03',
    purple: '#8F00FF',
  },

  // FontFamily
  interbold: 'Inter-Bold',
};

export const responsiveSize = baseSize => {
  return (baseSize * window.width) / 360;
};
