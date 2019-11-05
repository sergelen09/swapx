import React from 'react'
import { Link } from 'react-router-dom'

const ItemIndexTile = props => {
  return (
      <div className="col-lg-4 col-md-6 grid-item newe">
          <div className="gallery-content">
              <div className="gallery-image">
                  <div className="image-box">
                      <a href={`/items/${props.id}`}>
                        <div className="index-page-image">
                          <div className="image-div">
                            <img src={props.photo.url} className="img-fluid"/>
                          </div>
                        </div>
                      </a>
                  </div>
                  <div className="hover-box text-center">
                      <ul className="list-unstyled list-inline">
                          <li className="list-inline-item"><a href={`/items/${props.id}`}><img src="assets/preview.png" alt="" className="img-fluid"/></a></li>
                      </ul>
                  </div>
              </div>
              <div className="box-item d-flex flex-row justify-content-between">
                  <div className="box-item-heading">
                      <h4><a href="">{props.title}</a></h4>
                      <p>Location: {props.location}</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ItemIndexTile
