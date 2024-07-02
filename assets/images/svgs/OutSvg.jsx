import * as React from "react"
import Svg, { Path } from "react-native-svg"

const OutSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#CA3737"
      d="M1.4 20a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V2h-12v16h12v-2h2v3a1 1 0 0 1-1 1h-14Zm13-6v-3h-7V9h7V6l5 4-5 4Z"
    />
  </Svg>
)

export default OutSvg