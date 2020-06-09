import React from "react"
import Nav from "./nav"

const Header = ({ siteTitle }) => (
  <header>
    {/* Header Title */}
    <h1>Aiden Barrett</h1>

    <div className="spacer"></div>

    <Nav />
  </header>
)

export default Header
