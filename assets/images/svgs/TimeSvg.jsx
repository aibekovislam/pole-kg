import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TimeSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M9 .667A8.333 8.333 0 1 1 .667 9h1.666a6.667 6.667 0 1 0 1.154-3.75h2.18v1.667h-5v-5h1.666V4A8.32 8.32 0 0 1 9 .667Zm.833 4.167v3.82l2.703 2.703-1.179 1.179-3.19-3.192v-4.51h1.666Z"
    />
  </Svg>
)
export default TimeSvg
