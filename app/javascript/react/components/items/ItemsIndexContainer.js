import React, { useState, useEffect } from 'react'
import _ from "lodash"
import ItemIndexTile from './ItemIndexTile'
import WelcomeTile from './WelcomeTile'
import ItemForm from './ItemForm'

const ItemsIndexContainer = props => {
  const [items, setItems] = useState([])
  const [errors, setErrors] = useState({})
  const [itemFields, setItemFields] = useState({
    title: "",
    description: "",
    location: "",
    photo: ""
  })

  const handleInputChange = event => {
    setItemFields({
      ...itemFields,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}

    const requiredFields = ["title", "description"]

    requiredFields.forEach(field => {
      if(itemFields[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch('/api/v1/items.json', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(itemFields),
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
      if (body) {
        setItems([...items, body.item])
      } else {
        setItemFields(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

    setItemFields({
      title: "",
      description: "",
      location: "",
      photo: ""
    })
    }
  }

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
        id={item.id}
        key={item.id}
        title={item.title}
        description={item.description}
      />
  )
  })

  return (
    <div className="page-container">
      <div className="item-form">
        <ItemForm
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          itemFields={itemFields}
          errors={errors}
        />
      </div>
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
