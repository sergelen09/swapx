import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import ItemIndexTile from "./items/ItemIndexTile"

describe("ItemTile", () => {
  let wrapper

  let item = {
    id: 1,
    title: "Monopoly",
    location: "Boston, MA",
    category: "board games",
    photo: {
      url: "www.photo.com"
    }
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ItemIndexTile
          id={item.id}
          title={item.title}
          location={item.location}
          category={item.category}
          photo={item.photo}
        />
      </BrowserRouter>
    )
  })

  it("renders an h4 tag with the item title", () => {
    expect(wrapper.find("h4").text()).toBe("Monopoly")
  })

  it("renders the location", () => {
    expect(wrapper.find("#location").text()).toBe("Location: Boston, MA")
  })

  it("renders the category", () => {
    expect(wrapper.find("#category").text()).toBe("Category: board games")
  })

  it("renders the img tag with the photo url", () => {
    expect(wrapper.find("img").prop("src")).toEqual("www.photo.com")
  })
})
