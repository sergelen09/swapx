import React, { useState, useEffect } from 'react'

const OfferPendingForm = props => {
  const [offeredItem, setOfferedItem] = useState("")

  useEffect(() => {
    fetch(`/api/v1/items/${props.item.id}`,
      {
        headers: {
          "Accept": "application/json"
        },
        credentials: "same-origin"
      }
    )
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
      setOfferedItem(props.item.offer.id)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const acceptOffer = event => {
    event.preventDefault()
    handleAccept({
      offer: offeredItem
    })
  }

  const handleAccept = (payload) => {
    fetch(`/api/v1/offers/${offeredItem}`, {
      credentials: "same-origin",
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      props.acceptedFunc(props.offer)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const rejectOffer = event => {
    event.preventDefault()
    handleReject({
      offer: offeredItem,
      item: props.item
    })
  }


  const handleReject = (payload) => {
    fetch(`/api/v1/offers/${offeredItem}`, {
      credentials: "same-origin",
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      props.refreshFunc(body.item)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div>
      <div className="product-price text-center">
        <p>Accept or Reject</p>
        <form onSubmit={acceptOffer}>
          <button className="buy-btn">Accept</button>
        </form>

        <form className="reject-form" onSubmit={rejectOffer}>
          <button className="reject-btn">Reject</button>
        </form>
      </div>
    </div>
  )
}

export default OfferPendingForm
