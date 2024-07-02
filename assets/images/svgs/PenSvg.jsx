import * as React from "react"
import Svg, { Path } from "react-native-svg";

const PenSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M11.107 5.98 9.928 4.801l-7.761 7.762v1.178h1.178l7.762-7.761Zm1.178-1.179 1.179-1.178-1.179-1.179-1.178 1.179 1.178 1.178Zm-8.25 10.607H.5v-3.535L11.696.677a.833.833 0 0 1 1.178 0l2.357 2.357a.833.833 0 0 1 0 1.178L4.036 15.408Z"
    />
  </Svg>
)
export default PenSvg
