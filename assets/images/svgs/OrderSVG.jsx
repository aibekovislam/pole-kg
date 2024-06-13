import * as React from "react"
import Svg, { Path } from "react-native-svg"

const OrderSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M14.666 0v2h3.007c.549 0 .994.445.994.993v16.014a.994.994 0 0 1-.994.993H1.66a.993.993 0 0 1-.993-.993V2.993c0-.548.444-.993.993-.993h3.006V0h10Zm-10 4h-2v14h14V4h-2v2h-10V4Zm2 10v2h-2v-2h2Zm0-3v2h-2v-2h2Zm0-3v2h-2V8h2Zm6-6h-6v2h6V2Z"
    />
  </Svg>
)

export default OrderSVG
