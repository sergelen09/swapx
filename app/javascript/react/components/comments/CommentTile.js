import React from 'react'

const CommentTile = props => {
  return(
    <div className={`comment-box ${props.commentClass}`}>
        <div className="comment-content">
            <ul className="list-unstyled list-inline">
                <li className="list-inline-item"><a href="">{props.username}</a></li>
            </ul>
            <p>{props.comment}</p>
        </div>
    </div>

  )
}

export default CommentTile
