import * as React from "react"
import Svg, { Path } from "react-native-svg";

const ArrowDownSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={10}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M16 0H0l8.182 10L16 0Z" />
  </Svg>
)

export default ArrowDownSVG