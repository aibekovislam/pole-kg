import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PersonalSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M3.333 18.333a6.667 6.667 0 1 1 13.334 0H15a5 5 0 0 0-10 0H3.333Zm6.667-7.5c-2.763 0-5-2.237-5-5 0-2.762 2.237-5 5-5 2.762 0 5 2.238 5 5 0 2.763-2.238 5-5 5Zm0-1.666a3.332 3.332 0 0 0 3.333-3.334A3.332 3.332 0 1 0 10 9.166Z"
    />
  </Svg>
)
export default PersonalSVG