import React, { useState, useEffect } from 'react'
import ItemShowPage from './ItemShowPage'

const ItemShowContainer = props => {
  const [item, setItem] = useState({})
  const [trade, setTrade] = useState({})
  const [offer, setOffer] = useState(null)
  const [comments, setComments] = useState([])
  const [commentFields, setCommentFields] = useState({
    body: ""
  })

  let itemId = props.match.params.id

  const handleInputChange = event => {
    setCommentFields({
      ...commentFields,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const redirectFunc = (item) => {
    setTrade(item)
  }

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
        setComments(body.item.comments)
        setOffer(body.item.offer.id)
      } else {
      setTrade({
        title: "",
        description: "",
        location: ""
      })
    }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const addComment = event => {
    event.preventDefault()
    handleSubmit({...commentFields, offer})
    setCommentFields({
      body: ""
    })
  }

  const handleSubmit = (commentFields) => {
    fetch(`/api/v1/comments`, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(commentFields),
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
      if (comments) {
        setComments([...comments, body])
      } else {
        setComments(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div>
      <section className="breadcrumb-area text-center">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <h1>Swap</h1>
                      <ul className="list-unstyled list-inline">
                          <li className="list-inline-item"><a href="/">Home</a></li>
                          <li className="list-inline-item"><i className="fa fa-long-arrow-right"></i>Swap</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>
      <ItemShowPage
        key={item.id}
        id={item.id}
        item={item}
        trade={trade}
        addComment={addComment}
        handleInputChange={handleInputChange}
        commentFields={commentFields}
        comments={comments}
        user={item.current_user}
        tradeUser={item.trade_user}
        redirectFunc={redirectFunc}
      />
    </div>
  )
}

export default ItemShowContainer
