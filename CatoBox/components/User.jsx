import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
export const User = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle
      cx={12}
      cy={9}
      r={3}
      stroke="#1C274C"
      strokeWidth={1.5}
      opacity={0.5}
    />
    <Circle cx={12} cy={12} r={10} stroke="#1C274C" strokeWidth={1.5} />
    <Path
      stroke="#1C274C"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
      opacity={0.5}
    />
  </Svg>
)
