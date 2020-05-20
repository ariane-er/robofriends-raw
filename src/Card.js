import React from 'react';

const Card = ({name, email, id}) => {
    
    return (
        <div className="tc bg-light-pink dib br3 pa3 ma2 grow bw2 shadow-5">
            {/* We'll use a robot API */}
            <img alt="robot" src={`https://robohash.org/${id}`} height='200' width='200'/>
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default Card;