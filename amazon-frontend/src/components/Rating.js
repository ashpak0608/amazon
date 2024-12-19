import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import "../styles/Rating.css";

const Rating = (props) => {
    const { rating, numRev } = props;

    // Function to determine the icon for each star
    const getStarIcon = (index) => {
        if (rating >= index) return <StarIcon />;
        if (rating >= index - 0.5) return <StarHalfIcon />;
        return <StarBorderIcon />;
    };

    return (
        <div className="rating-container">
            <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>{getStarIcon(index + 1)}</span>
                ))}
            </div>
            <span>{numRev} reviews</span>
        </div>
    );
};

export default Rating;
