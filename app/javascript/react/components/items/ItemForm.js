import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import ErrorList from "../ErrorList"

const ItemForm = props => {
  const [itemFields, setItemFields] = useState({
    title: "",
    description: ""
  })

  const [errors, setErrors] = useState({})
  const [redirectNumber, setRedirectNumber] = useState(null)

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

  const handleSubmitHandler = event => {
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
        // setRedirectNumber(body.item)
      } else {
        // setErrors(body.errors)
        setItemFields(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

    setItemFields({
      title: "",
      description: ""
    })
    }
  }

  // if (redirectNumber) {
  //   return <Redirect to={`/items/${redirectNumber}`} />
  // }

  return(
    <div className="">
      <h2>Add a New Item</h2>
      <form onSubmit={handleSubmitHandler}>
        <ErrorList
          errors={errors}
        />
        <label htmlFor="title">Title:
          <input
            type="text"
            id="title"
            value={itemFields.title}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="description">Description:
          <input
            type="text"
            id="description"
            value={itemFields.description}
            onChange={handleInputChange}
          />
        </label>

        <input className="input-button" type="submit" value="Add Item" />
      </form>
    </div>
  )
}

export default ItemForm
