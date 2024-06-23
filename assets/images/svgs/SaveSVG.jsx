import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SaveSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M.875 0h12.25c.483 0 .875.412.875.92v17.62a.45.45 0 0 1-.438.46.422.422 0 0 1-.232-.07L7 14.755.67 18.93a.425.425 0 0 1-.603-.146A.478.478 0 0 1 0 18.54V.92C0 .412.392 0 .875 0ZM12.25 1.84H1.75v14.205L7 12.582l5.25 3.463V1.84Z"
    />
  </Svg>
)
export default SaveSVG