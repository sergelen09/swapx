import React from 'react'
import { Link } from 'react-router-dom'

const ItemIndexTile = props => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="item-index card">
        <div>
          <img src={props.photo.url} className="card-img-top"/>
        </div>
        <div className="card-body">
          <h4 className="card-title">
            {props.title}
          </h4>
          <p className="card-text">
          </p>
          <Link className="btn btn-primary" to={`/items/${props.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ItemIndexTile
