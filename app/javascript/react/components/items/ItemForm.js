import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "../ErrorList"
import Dropzone from 'react-dropzone'

const ItemForm = props => {
  const onDrop = props.onDrop

  return(
    <div className="modal fade" id="itemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Add an Item</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span id="close" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <form onSubmit={props.handleSubmit} className="item-form">
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
                  <textarea
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

                <section>
                  <div className="dropzone">
                    <Dropzone
                      className=""
                      multiple={false}
                      onDrop={file => onDrop(file)}
                    >
                      {({getRootProps, getInputProps}) => (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Click to upload photo / Drop your photo here</p>
                          </div>
                      )}
                    </Dropzone>
                  </div>
                  <aside>
                    <ul>
                      {
                        props.photoUpload.map(file => <li key={file.name}>{file.name} - {file.size} bytes</li>)
                      }
                    </ul>
                  </aside>
                </section>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Add Item</button>
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
