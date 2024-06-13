import * as React from "react"
import Svg, { Path } from "react-native-svg";

const ProfileSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#237133"
      d="M0 21a8 8 0 1 1 16 0h-2a6 6 0 0 0-12 0H0Zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"
    />
  </Svg>
)

export default ProfileSVG
