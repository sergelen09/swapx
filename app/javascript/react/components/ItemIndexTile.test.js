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
    description: "A great board game for all",
    photo: {
      url: "www.awesome.com"
    }
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ItemIndexTile
          id={item.id}
          title={item.title}
          description={item.description}
          photo={item.photo}
        />
      </BrowserRouter>
    )
  })

  it("renders an h4 tag with the item title", () => {
    expect(wrapper.find("h4").text()).toBe("Monopoly")
  })
})
