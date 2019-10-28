import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import ItemIndexTile from "./items/ItemIndexTile"

describe("ItemTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ItemIndexTile
          title="Monopoly"
          description="A great board game for all"
        />
      </BrowserRouter>
    )
  })

  it("renders an h4 tag with the item title", () => {
    expect(wrapper.find("h4").text()).toBe("Monopoly")
  })
})
