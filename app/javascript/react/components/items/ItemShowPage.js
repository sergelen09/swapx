import React from 'react'

const ItemShowPage = props => {
  return(
    <div>
      <div className="col-md-4 offset-md-2 item-show">
        <h1 className="item-title-show">Item:</h1>
        <div className="item-index">
          <img src="" className="card-img"/>
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
      <div className="col-md-4 offset-md-2">
        <h1 className="item-title-show">Offer:</h1>
        <div className="item-index">
          <img src="" className="card-img"/>
          <div className="card-body">
            <h4 className="card-title">
              {props.offerTitle}
            </h4>
            <p className="card-text">
              {props.offerDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemShowPage
