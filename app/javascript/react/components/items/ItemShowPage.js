import React from 'react'

const ItemShowPage = props => {
  let itemOnePic
  let itemTwoPic
  let offerInfo = "No Offer Yet"

  if (props.itemUrl) {
    itemOnePic = <img src={props.itemUrl} className="card-img"/>
  }

  if (props.tradeUrl) {
    itemTwoPic = <img src={props.tradeUrl} className="card-img"/>
    offerInfo = "Item Offer Info"
  }

  return(
    <section className="product-details">
      <div className="container">
          <div className="row">
              <div className="col-lg-8 col-md-7">
                  <div className="pro-details-box">
                      <div className="details-img-box">
                            {itemOnePic}
                          <h3>{props.title}</h3>
                      </div>
                  </div>
                  <div className="product-tab">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item">
                              <a className="nav-link active" data-toggle="tab" href="#item-details" role="tab">Item Details</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" data-toggle="tab" href="#comment" role="tab">Comments</a>
                          </li>
                      </ul>
                      <div className="tab-content">
                          <div className="tab-pane fade show active" id="item-details" role="tabpanel">
                              <p>{props.description}</p>
                          </div>
                          <div className="tab-pane fade" id="comment" role="tabpanel">
                              <div className="comment-box d-flex flex-row">
                                  <div className="comment-img">
                                      <a href=""><img src="" alt=""/></a>
                                  </div>
                                  <div className="comment-content">
                                      <ul className="list-unstyled list-inline">
                                          <li className="list-inline-item"><a href="">John Doe</a></li>
                                      </ul>
                                      <span>2 days ago</span>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                  </div>
                              </div>
                              <div className="comment-box comment-box2 d-flex flex-row">
                                  <div className="comment-img">
                                      <a href=""><img src="" alt=""/></a>
                                  </div>
                                  <div className="comment-content">
                                      <ul className="list-unstyled list-inline">
                                          <li className="list-inline-item"><a href="">Mary Chang</a></li>
                                      </ul>
                                      <span>2 days ago</span>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                  </div>
                              </div>
                              <div className="comment-form">
                                  <h5>Message Here</h5>
                                  //comment form
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4 col-md-5">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="product-price text-center">
                              <p>Offer an Item</p>
                              <select className="form-control custom-select">
                                  <option>first item</option>
                              </select>
                              <a href="" className="buy-btn">Submit Offer</a>
                          </div>
                      </div>
                      <div className="col-md-12">
                          <div className="item-saler">
                              <h6>{offerInfo}</h6>
                              <div className="saler-box d-flex flex-row">
                                  <div className="saler-img">
                                    {itemTwoPic}
                                  </div>
                                  <div className="saler-info">
                                      <h5><a href=""></a></h5>
                                      <p>{props.trade.location}</p>
                                      <p>{props.trade.description}</p>
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
