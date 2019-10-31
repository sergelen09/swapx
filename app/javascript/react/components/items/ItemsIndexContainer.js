import React, { useState, useEffect } from 'react'
import ItemIndexTile from './ItemIndexTile'
import WelcomeTile from './WelcomeTile'

const ItemsIndexContainer = props => {
  const [items, setItems] = useState([])

  useEffect(() => {
    let search = ""
    if (props.location.search) {
      search = props.location.search
    }
    fetch(`/api/v1/items${search}.json`)
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
      setItems(body.items)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const itemTiles = items.map(item => {
    return(
      <ItemIndexTile
        key={item.id}
        title={item.title}
        description={item.description}
      />
    )
  })

  return (
    <div className='page-container'>
      <div>
        <WelcomeTile />
      </div>
      <div className="container-fluid padding item-tile">
        <div className="row justify-content-center">
          {itemTiles}
        </div>
      </div>
    </div>
  )
}

export default ItemsIndexContainer
