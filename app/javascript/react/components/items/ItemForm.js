import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import ErrorList from "../ErrorList"

const ItemForm = props => {
  return(
    <div className="modal fade" id="itemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Add an Item</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <form onSubmit={props.handleSubmit} className="mr-auto">
                <ErrorList
                  errors={props.errors}
                />
                <label htmlFor="title">Title:
                  <input
                    type="text"
                    id="title"
                    value={props.itemFields.title}
                    onChange={props.handleInputChange}
                  />
                </label>

                <label htmlFor="description">Description:
                  <input
                    type="text"
                    id="description"
                    value={props.itemFields.description}
                    onChange={props.handleInputChange}
                  />
                </label>

                <label htmlFor="location">City and State:
                  <input
                    type="text"
                    id="location"
                    value={props.itemFields.location}
                    onChange={props.handleInputChange}
                  />
                </label>

                <label htmlFor="photo">Photo:
                  <input
                    type="text"
                    id="photo"
                    value={props.itemFields.photo}
                    onChange={props.handleInputChange}
                  />
                </label>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#itemModal">Add Item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ItemForm
