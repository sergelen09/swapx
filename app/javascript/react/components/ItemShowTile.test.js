import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import ItemShowTile from "./items/ItemShowTile"

describe("ItemTile", () => {
  let wrapper
  let addComment
  let handleInputChange

  let itemUser = 1

  let offer = {
    id: 1,
    status: "accepted"
  }

  let item = {
    id: 1,
    title: "Monopoly",
    description: "A great board game for all",
    location: "Boston, MA",
    category: "board games",
    user: {
      id: 1,
      location: "Amesbury, MA",
      username: "user"
    },
    photo: {
      url: "www.photo.com"
    }
  }

  let trade = {
    id: 2,
    title: "Catan",
    description: "A great board game for all",
    location: "Boston, MA",
    category: "board games",
    photo: {
      url: "www.photo.com"
    }
  }

  let comments = [
    {
      key: 1,
      user_id: 1,
      body: "Lets swap!"
    },
    {
      key: 2,
      user_id: 2,
      body: "Lets swap!"
    }
  ]

  let user = {
    id: 1,
    location: "Amesbury, MA",
    username: "user",
    logged_in: true
  }

  let currentUser = {
    id: 1,
    username: "danny",
    location: "Boston, MA"
  }

  let tradeUser = {
    id: 2,
    username: "test",
    location: "Boston, MA"
  }

  let commentFields = {
    body: "body"
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ItemShowTile
          key={item.id}
          id={item.id}
          item={item}
          trade={trade}
          addComment={addComment}
          handleInputChange={handleInputChange}
          comments={comments}
          itemUser={itemUser}
          user={user}
          currentUser={currentUser}
          tradeUser={tradeUser}
          offer={offer}
          commentFields={commentFields}
        />
      </BrowserRouter>
    )
  })

  it("renders an h3 tag with the item title", () => {
    expect(wrapper.find("h3").text()).toBe("Monopoly")
  })

  it("renders the item location", () => {
    expect(wrapper.find("#location").text()).toBe("Location: Boston, MA")
  })

  it("renders the item category", () => {
    expect(wrapper.find("#category").text()).toBe("Category: board games")
  })

  it("renders the item description", () => {
    expect(wrapper.find("#description").text()).toBe("A great board game for all")
  })

  it("renders an h4 tag with the trade item title", () => {
    expect(wrapper.find("h4").text()).toBe("Catan")
  })

  it("renders the trade item location", () => {
    expect(wrapper.find("#tradeLocation").text()).toBe("Location: Boston, MA")
  })

  it("renders the trade item category", () => {
    expect(wrapper.find("#tradeCategory").text()).toBe("Category: board games")
  })

  it("renders the trade item description", () => {
    expect(wrapper.find("#tradeDescription").text()).toBe("Details: A great board game for all")
  })
})
