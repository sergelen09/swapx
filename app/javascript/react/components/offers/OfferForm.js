import React, { useState, useEffect } from 'react'

const OfferForm = props => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [offeredItem, setOfferedItem] = useState("")

  let options = <option>No Items</option>

  const handleInputChange = event => {
    setSelectedItem(event.currentTarget.value)
  }

  useEffect(() => {
    fetch(`/api/v1/offers`,
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
      if (body.items) {
        setItems(body.items)
        setOfferedItem(props.item.id)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    createOffer({
      selectedItem: selectedItem,
      offeredItem: offeredItem
    })
  }

  const createOffer = (payload) => {
    fetch(`/api/v1/offers`, {
      credentials: "same-origin",
      method: 'POST',
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
      props.redirectFunc(body.item, body.offer.id)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }


  if (items.length > 0) {
    options = items.map(item => {
      return(
        <option key={item.id} value={item.id}>{item.title}</option>
      )
    })
  }

  return(
    <div className="product-price text-center">
        <p>Offer an Item</p>
        <form onSubmit={handleSubmit}>

          <label htmlFor="title">
            <select
              className="form-control custom-select"
              id="title"
              onChange={handleInputChange}
            >
            <option value="">Choose One</option>
              {options}
            </select>
          </label>

          <button className="buy-btn">Submit Offer</button>
        </form>
    </div>
  )
}

export default OfferForm
