import * as React from "react"
import Svg, { Path } from "react-native-svg";

const MoneySVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M.878.377h11.25c.345 0 .625.28.625.625v10c0 .345-.28.625-.625.625H.878a.625.625 0 0 1-.625-.625v-10c0-.345.28-.625.625-.625Zm.625 1.25v8.75h10v-8.75h-10Zm2.812 5.625h3.438a.312.312 0 1 0 0-.625h-2.5a1.562 1.562 0 1 1 0-3.125h.625v-1.25h1.25v1.25H8.69v1.25H5.253a.313.313 0 0 0 0 .625h2.5a1.563 1.563 0 0 1 0 3.125h-.625v1.25h-1.25v-1.25H4.315v-1.25Z"
    />
  </Svg>
)

export default MoneySVG