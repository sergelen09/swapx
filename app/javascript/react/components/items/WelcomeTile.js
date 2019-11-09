import React, { useState, useEffect } from 'react'

const WelcomeTile = props => {
  const [signedIn, setSignedIn] = useState(true)
  const [items, setItems] = useState([])
  const [itemsNear, setItemsNear] = useState([])
  const [offers, setOffers] = useState([])

  let button

  useEffect(() => {
    fetch(`/api/v1/users`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.user) {
        setSignedIn(body.logged_in)
      } else {
        setSignedIn(body.user)
      }
      setItemsNear(body.items_near)
      setItems(body.items)
      setOffers(body.offers)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  if (signedIn) {
    button = <a href="" data-toggle="modal" data-target="#itemModal">Add Item</a>
  } else {
    button = <a href="/users/sign_up">Sign Up</a>
  }

  return(
    <section className="banner text-center">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="banner-content">
                        <h1>Welcome!</h1>
                        {button}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="counter-number">
                        <h5 className="welcome-text"><span className="counter">{items.length}</span> Total Items</h5>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="counter-number">
                        <h5 className="welcome-text"><span className="counter">{itemsNear.length}</span> Items Near You</h5>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="counter-number">
                        <h5 className="welcome-text"><span className="counter">{offers.length}</span> Items Swapped</h5>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WelcomeTile
