import * as React from "react"
import Svg, { Path } from "react-native-svg"

const NotificationSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M12.75 12H.25v-1.25h.625V6.395C.875 3.277 3.393.75 6.5.75s5.625 2.527 5.625 5.645v4.355h.625V12ZM2.125 10.75h8.75V6.395C10.875 3.968 8.916 2 6.5 2S2.125 3.968 2.125 6.395v4.355Zm2.813 1.875h3.125a1.563 1.563 0 0 1-3.126 0Z"
    />
  </Svg>
)
export default NotificationSVG