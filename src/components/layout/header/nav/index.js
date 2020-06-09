import React from 'react'
import { Link } from "gatsby"


const Nav = () => (
    <div className="nav">
        <ul className="nav-links">
            <Link to="/"><li>Home</li></Link>
            <Link to="/projects"><li>Projects</li></Link>
        </ul>
    </div>
)

export default Nav