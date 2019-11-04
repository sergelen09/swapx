import React from 'react'

const ItemShowPage = props => {
  let itemOnePic
  let itemTwoPic

  if (props.itemUrl) {
    itemOnePic = <img src={props.itemUrl} className="card-img"/>
  }

  if (props.tradeUrl) {
    itemTwoPic = <img src={props.tradeUrl} className="card-img"/>
  }
  
  return(
    <div className="item-show-wrap">
      <div className="col-md-4 offset-md-2 item-show">
        <h2 className="item-title-show">Item:</h2>
        <div className="item-index">
          {itemOnePic}
          <div className="card-body">
            <h4 className="card-title">
              {props.title}
            </h4>
            <p>
              {props.location}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 offset-md-2">
        <h2 className="item-title-show">Offer:</h2>
        <div className="item-index">
          {itemTwoPic}
          <div className="card-body">
            <h4 className="card-title">
              {props.trade.title}
            </h4>
            <p className="card-text">
              {props.trade.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemShowPage
