import Svg, { Circle, Line } from 'react-native-svg';

export default function AddPhotoSVG() {
  return (
    <Svg height="100%" width="100%" viewBox="0 0 100 100">
      <Circle cx="13" cy="13" r="12.5" stroke="#ff6c00" strokeWidth="1" fill="#fff" />
      <Line x1="6" y1="12.5" x2="19" y2="12.5" stroke="#ff6c00" strokeWidth="1" />
      <Line x1="12.5" y1="6" x2="12.5" y2="19" stroke="#ff6c00" strokeWidth="1" />
    </Svg>
  );
}
