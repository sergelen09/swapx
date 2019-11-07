import React, { useState, useEffect } from 'react'
import _ from "lodash"
import ItemIndexTile from './ItemIndexTile'
import WelcomeTile from './WelcomeTile'
import ItemForm from './ItemForm'

const ItemsIndexContainer = props => {
  const [items, setItems] = useState([])
  const [errors, setErrors] = useState({})
  const [photoUpload, setPhotoUpload] = useState([])
  const [message, setMessage] = useState("")
  const [itemFields, setItemFields] = useState({
    title: "",
    description: "",
    location: ""
  })

  const closeModal = () => {
    document.getElementById("close").click()
  }

  const onDrop = (file) => {
    if(file.length == 1) {
      setPhotoUpload(file)
    } else {
      setMessage("You can only upload 1 photo")
    }
  }

  const handleInputChange = event => {
    setItemFields({
      ...itemFields,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}

    const requiredFields = ["title", "description", "location", "photo"]

    requiredFields.forEach(field => {
      if(itemFields[field] === "") {
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
      let submittedFields = new FormData()
      submittedFields.append("title", itemFields.title)
      submittedFields.append("description", itemFields.description)
      submittedFields.append("location", itemFields.location)
      submittedFields.append("photo", photoUpload[0])

      closeModal()

      fetch('/api/v1/items.json', {
      credentials: "same-origin",
      method: 'POST',
      body: submittedFields
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
      if (body.item.id) {
        setItems([...items, body.item])
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

    setItemFields({
      title: "",
      description: "",
      location: ""
    })
    setPhotoUpload([])
    }
  }

  useEffect(() => {
    // let search = ""
    // if (props.location.search) {
    //   search = props.location.search
    // }
    fetch(`/api/v1/items`)
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
        photo={item.photo}
        location={item.location}
      />
  )
  })

  return (
    <div className="">
      <div className="item-form">
        <ItemForm
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          itemFields={itemFields}
          errors={errors}
          onDrop={onDrop}
          photoUpload={photoUpload}
        />
      </div>
      <div>
        <WelcomeTile />
      </div>
      <section className="gallery-box">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="gallery-top text-center">
                          <h2>Find The Perfect Item</h2>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <ul className="gallery-filter list-unstyled list-inline text-center">
                          <li className="list-inline-item active">Newest</li>
                          <li className="list-inline-item">Board Games</li>
                          <li className="list-inline-item">Collectibles</li>
                          <li className="list-inline-item">Games</li>
                      </ul>
                  </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="gallery-items row">
                    {itemTiles}
                  </div>
                </div>
              </div>
          </div>
      </section>
  </div>
  )
}

export default ItemsIndexContainer
