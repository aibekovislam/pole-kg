import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HomeSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M19.125 20H4.875a1.018 1.018 0 0 1-1.018-1.018v-9.16H.803L11.315.264a1.018 1.018 0 0 1 1.37 0L23.197 9.82h-3.054v9.161c0 .562-.456 1.018-1.018 1.018ZM5.893 17.964h12.214V7.946L12 2.394 5.893 7.946v10.018ZM12 13.893a2.545 2.545 0 1 1 0-5.09 2.545 2.545 0 0 1 0 5.09Z"
    />
  </Svg>
)

export default HomeSVG