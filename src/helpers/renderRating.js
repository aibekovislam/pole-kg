import RatingSVG from "../../assets/images/svgs/Rating";
import RatingNoSVG from "../../assets/images/svgs/RatingNo";

export const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <RatingSVG key={i} /> : <RatingNoSVG key={i} />);
    }
    return stars;
};