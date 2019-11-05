import React from 'react'

const WelcomeTile = props => {
  return(
    <section className="banner text-center">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="banner-content">
                        <h1>Welcome</h1>
                        <a href="/users/sign_up">Sign Up</a>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#itemModal">
                          Add Item
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="counter-number">
                        <h5 className="welcome-text"><span className="counter">50</span> Total Items</h5>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="counter-number">
                        <h5 className="welcome-text"><span className="counter">20</span> Items Near You</h5>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="counter-number">
                        <h5 className="welcome-text"><span className="counter">6</span> Items Swapped</h5>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WelcomeTile
