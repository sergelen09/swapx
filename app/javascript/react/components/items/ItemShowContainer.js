import React, { useState, useEffect } from 'react'
import ItemShowPage from './ItemShowPage'

const ItemShowContainer = props => {
  const [item, setItem] = useState({})
  const [trade, setTrade] = useState({})
  const [itemUrl, setItemUrl] = useState("")
  const [tradeUrl, setTradeUrl] = useState("")

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
      setItemUrl(body.item.photo.url)
      if (body.item.traded_item_info) {
      setTrade(body.item.traded_item_info)
      setTradeUrl(body.item.traded_item_info.photo.url)
    } else {
      setTrade({
        title: "No Offer Yet",
        description: "",
        location: ""
      })
      setTradeUrl(null)
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
        itemUrl={itemUrl}
        trade={trade}
        tradeUrl={tradeUrl}
      />
    </div>
  )
}

export default ItemShowContainer
