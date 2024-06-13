import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SizeSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M10.75 5.875V4l2.5 2.5-2.5 2.5V7.125H7.625v3.125H9.5L7 12.75l-2.5-2.5h1.875V7.125H3.25V9L.75 6.5 3.25 4v1.875h3.125V2.75H4.5L7 .25l2.5 2.5H7.625v3.125h3.125Z"
    />
  </Svg>
)
export default SizeSVG
