import React from 'react'

const CommentForm = props => {
  return(
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={props.addComment} id="review-form">

          <label htmlFor="body">
            <input
              placeholder="Enter a Message"
              type="text"
              id="body"
              value={props.commentFields.body}
              onChange={props.handleInputChange}
            />
          </label>

          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
