import { React } from 'react';


const Cards = () => {
  return (
    <div className="card-container">
        <div className="card">
            <img src="https://www.stadiumgoods.com/cdn/shop/files/Rf8P4urAXjypCZVgYJKA2LL9.png?crop=center&height=480&v=1726852350&width=480"/>
            <div className="card-info">
                <h2>Placeholder Title</h2>
                <h3>Placeholder Category</h3>
            </div>

            <div className = "card-buttons">
                <button>View Board</button>
                <button>Delete Board</button>
            </div>
        </div>

    </div>
  );
}


export default Cards;
