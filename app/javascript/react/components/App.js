import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ItemsIndexContainer from "./items/ItemsIndexContainer"
import ItemShowContainer from "./items/ItemShowContainer"
import OfferPendingForm from "./offers/OfferPendingForm"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ItemsIndexContainer} />
        <Route exact path="/items" component={ItemsIndexContainer} />
        <Route exact path="/items/:id" component={ItemShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
