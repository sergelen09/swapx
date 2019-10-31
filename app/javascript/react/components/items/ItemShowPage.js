import React from 'react'

const ItemShowPage = props => {
  return(
    <div className="col-md-4 offset-md-3">
      <h1 className="item-title-show">Item:</h1>
      <div className="item-index">
        <img src="https://i.gyazo.com/393204aa8874fbada9908edd3335b491.jpg" className="card-img"/>
        <div className="card-body">
          <h4 className="card-title">
            {props.title}
          </h4>
          <p className="card-text">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ItemShowPage
