import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ShareSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="m9.934 13.186-3.5-1.909a3.333 3.333 0 1 1 0-4.554l3.5-1.908a3.333 3.333 0 1 1 .799 1.463l-3.5 1.908a3.34 3.34 0 0 1 0 1.629l3.5 1.908a3.333 3.333 0 1 1-.799 1.463ZM4 10.667a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Zm9.167-5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Zm0 10a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z"
    />
  </Svg>
)
export default ShareSvg
