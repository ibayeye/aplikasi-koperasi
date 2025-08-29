import React from "react";

const Card = ({ title, body, actions }) => {
  return (
    <div className="card card-dash bg-base-100/5 w-82 h-46">
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title">{title}</h2>
        <div className="flex flex-1 justify-center items-center">
          <p className="text-center text-lg font-bold">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
