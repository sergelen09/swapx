import React from 'react'

const ItemIndexTile = props => {
  return (
    <div className="card" style={{width: "18rem"}}>
      <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTX6boDPytGugCm0cmKzvCHGeLsqzLeaP6BhxRbXt0ZcNKCgHnr8Q&usqp=CAc" className="card-img-top"/>
      <div className="card-body">
        <h4 className="card-title">
          {props.title}
        </h4>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <a href="/" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  )
}

export default ItemIndexTile
