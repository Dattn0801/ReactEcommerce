import { Card, Skeleton } from "antd";
import React from "react";
const LoadingCard = ({ count }) => {
  const card = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{card()}</div>;
};
export default LoadingCard;
