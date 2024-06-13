import * as React from "react"
import Svg, { Path } from "react-native-svg";

const MapSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="m8 16.653 4.125-4.125a5.833 5.833 0 1 0-8.25 0L8 16.653Zm0 2.357-5.303-5.303a7.5 7.5 0 1 1 10.606 0L8 19.01Zm0-8.94a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Zm0 1.667A3.333 3.333 0 1 1 8 5.07a3.333 3.333 0 0 1 0 6.667Z"
    />
  </Svg>
)

export default MapSVG