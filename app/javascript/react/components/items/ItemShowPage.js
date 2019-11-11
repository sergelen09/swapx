import React from 'react'
import CommentForm from '../comments/CommentForm'
import CommentTile from '../comments/CommentTile'
import OfferForm from '../offers/OfferForm'

const ItemShowPage = props => {
  let itemOnePic
  let itemTwoPic
  let offerInfo = "No Offer Yet"
  let messageHead = "No Messages Yet"
  let tabToggle = ""
  let offerArea

  if (props.comments.length !== 0) {
    messageHead = "Messages"
  }

  if (props.item.photo) {
    itemOnePic = <img src={props.item.photo.url} className="img-fluid"/>
  }

  if (props.trade.photo) {
    itemTwoPic = <img src={props.trade.photo.url} className="img-fluid"/>
    offerInfo = "Item Offered"
    tabToggle = "tab"
    offerArea = <div className="product-price text-center"><p className="offer-pending">Offer Pending</p></div>
    messageHead = "Messages"
  } else {
    offerArea = <OfferForm redirectFunc={props.redirectFunc} item={props.item}/>
  }

  const commentsTile = props.comments.map(comment => {
    let commentClass = ""
    let username = ""

    if (props.user.id === comment.user_id) {
      commentClass = "comment-box2"
      username = props.user.username
    } else if (props.user.id !== comment.user_id && comment.user_id === props.tradeUser.id) {
      commentClass = "comment-margin"
      username = props.tradeUser.username
    } else if (props.user.id !== comment.user_id && props.user.id === props.item.user.id) {
      commentClass = "comment-box2"
      username = props.user.username
    } else {
      commentClass = "comment-margin"
      username = props.tradeUser.username
    }

    return(
      <CommentTile
        key={comment.id}
        comment={comment.body}
        username={username}
        commentClass={commentClass}
      />
    )
  })

  return(
    <section className="product-details">
      <div className="container">
          <div className="row">
              <div className="col-lg-8 col-md-7">
                  <div className="pro-details-box">
                      <div className="details-img-box">
                        <div className="image-div">
                          {itemOnePic}
                        </div>
                        <h3>{props.item.title}</h3>
                      </div>
                  </div>
                  <div className="product-tab">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item">
                              <a className="nav-link active" data-toggle="tab" href="#item-details" role="tab">Item Details</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" data-toggle={tabToggle} href="#comment" role="tab">{messageHead}</a>
                          </li>
                      </ul>
                      <div className="tab-content">
                          <div className="tab-pane fade show active" id="item-details" role="tabpanel">
                            <p>Location: {props.item.location}</p>
                            <p>Category: {props.item.category}</p>
                            <p>{props.item.description}</p>
                          </div>
                          <div className="tab-pane fade" id="comment" role="tabpanel">
                              {commentsTile}
                              <div className="comment-form">
                                  <CommentForm
                                    addComment={props.addComment}
                                    handleInputChange={props.handleInputChange}
                                    commentFields={props.commentFields}
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4 col-md-5">
                  <div className="row">
                      <div className="col-md-12">
                        {offerArea}
                      </div>
                      <div className="col-md-12">
                          <div className="item-saler">
                              <h6>{offerInfo}</h6>
                              <div className="saler-box">
                                  <div className="saler-img">
                                    {itemTwoPic}
                                  </div>
                                  <div className="saler-info">
                                      <p>Location: {props.trade.location}</p>
                                      <p>Category: {props.trade.category}</p>
                                      <p>Details: {props.trade.description}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  )
}

export default ItemShowPage
