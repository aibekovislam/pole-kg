import * as React from "react"
import Svg, { Path } from "react-native-svg"

const RatingSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="m8 12.174-4.702 2.632 1.05-5.286L.392 5.861l5.351-.634L8.001.333l2.257 4.894 5.351.634-3.956 3.66 1.05 5.285L8 12.174Z"
    />
  </Svg>
)

export default RatingSVG