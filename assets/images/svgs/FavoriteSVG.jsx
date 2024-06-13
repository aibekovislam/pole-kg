import * as React from "react"
import Svg, { Path } from "react-native-svg"
const FavoriteSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M1.333 0h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.765.424L8.334 16.03l-7.235 4.536a.5.5 0 0 1-.766-.424V1a1 1 0 0 1 1-1Zm13 2h-12v15.432l6-3.761 6 3.761V2Z"
    />
  </Svg>
)
export default FavoriteSVG
