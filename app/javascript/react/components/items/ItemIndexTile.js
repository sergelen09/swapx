import React from 'react'
import { Link } from 'react-router-dom'

const ItemIndexTile = props => {
  let redirect

  if (props.user) {
    redirect = `/items/${props.id}`
  } else {
    redirect = `/users/sign_in`
  }

  return (
      <div className="col-lg-4 col-md-6 grid-item newe">
          <div className="gallery-content">
              <div className="gallery-image">
                  <div className="image-box">
                      <a href={redirect}>
                        <div className="index-page-image">
                          <div className="image-div">
                            <img src={props.photo.url} className="img-fluid"/>
                          </div>
                        </div>
                      </a>
                  </div>
                  <div className="hover-box text-center">
                      <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                            <a href={`${redirect}`}>
                              <i className="fa fa-info-circle fa-5x item-icon">
                              </i>
                            </a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="box-item d-flex flex-row justify-content-between">
                  <div className="box-item-heading">
                      <h4><a href={redirect}>{props.title}</a></h4>
                      <p id="location">Location: {props.location}</p>
                      <p id="category">Category: {props.category}</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ItemIndexTile
