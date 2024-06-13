import * as React from "react"
import Svg, { Path } from "react-native-svg"
const FilterSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M4 0v3H0v2h4v3h2V0H4Zm4 5h10V3H8v2Zm6 5v3h4v2h-4v3h-2v-8h2Zm-4 5H0v-2h10v2Z"
    />
  </Svg>
)
export default FilterSVG
