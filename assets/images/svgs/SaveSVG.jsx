import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SaveSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M.688.5h9.624c.38 0 .688.304.688.678v12.983c0 .187-.154.339-.344.339a.347.347 0 0 1-.182-.052L5.5 11.372.526 14.448a.346.346 0 0 1-.473-.107.336.336 0 0 1-.053-.18V1.178C0 .804.308.5.688.5Zm8.937 1.356h-8.25v10.466L5.5 9.772l4.125 2.55V1.856Z"
    />
  </Svg>
)
export default SaveSVG