import * as React from "react"
import Svg, { Path } from "react-native-svg";

const CalendarSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M5 .333v1.334h4V.333h1.334v1.334H13c.368 0 .667.298.667.666V13a.667.667 0 0 1-.667.667H1A.667.667 0 0 1 .333 13V2.334c0-.369.299-.667.667-.667h2.667V.333H5ZM12.334 7H1.667v5.334h10.667V7ZM3.667 3h-2v2.667h10.666V3h-2v1.333H9V3H5v1.333H3.667V3Z"
    />
  </Svg>
)
export default CalendarSVG