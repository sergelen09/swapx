import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import CommentTile from "./comments/CommentTile"

describe("CommentTile", () => {
  let wrapper

  let comment = {
    id: 1,
    body: "Let's meet in Boston",
    username: "user"
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <CommentTile
          id={comment.id}
          comment={comment.body}
          username={comment.username}
        />
      </BrowserRouter>
    )
  })

  it("renders an p tag with the comment", () => {
    expect(wrapper.find("p").text()).toBe("Let's meet in Boston")
  })

  it("renders an li tag with the username", () => {
    expect(wrapper.find("li").text()).toBe("user")
  })
})
