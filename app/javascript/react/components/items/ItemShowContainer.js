import React, { useState, useEffect } from 'react'
import ItemShowPage from './ItemShowPage'

const ItemShowContainer = props => {
  const [item, setItem] = useState({
    title: "",
    description: ""
  })
  const [offer, setOffer] = useState({
    title: "",
    description: ""
  })

  let itemId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/items/${itemId}`)
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
      setItem(body.item)
      setOffer(body.item.offered_item)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return(
    <div>
      <ItemShowPage
        id={item.id}
        title={item.title}
        description={item.description}
        offerId={offer.id}
        offerTitle={offer.title}
        offerDescription={offer.description}
      />
    </div>
  )
}

export default ItemShowContainer
