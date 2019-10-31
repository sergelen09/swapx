import React, { useState, useEffect } from 'react'
import ItemShowPage from './ItemShowPage'

const ItemShowContainer = props => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    location: ""
  })
  const [trade, setTrade] = useState({
    title: "",
    description: "",
    location: ""
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
      if (body.item.traded_item_info) {
      setTrade(body.item.traded_item_info)
    } else {
      setTrade({
        title: "No Offer Yet",
        description: "",
        location: ""
      })
    }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return(
    <div>
      <ItemShowPage
        id={item.id}
        title={item.title}
        description={item.description}
        location={item.location}
        trade={trade}
      />
    </div>
  )
}

export default ItemShowContainer
