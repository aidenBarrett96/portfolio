import React from "react"
import Layout from "../components/layout"
import SEO from "../components/globals/seo"
import { Link } from "gatsby"
import pStyle from "../styles/home.module.scss"

//make functional component and put function below outside of the render
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className={pStyle.landingSection}>
      <h1>
        Hi, I'm Aiden. I'm a{" "}
        <span>
          Full Stack <br /> Developer{" "}
        </span>{" "}
        currently solving problems at NPK Media
      </h1>
      <Link className="button-link" to="">
        View Latest Project
      </Link>
    </section>
    <section className={pStyle.projectsContainer}>
      <h2>Featured Projects</h2>
      <div className={pStyle.inner}></div>
    </section>

    <section className={pStyle.skills}>
      <div>
        <h2>Soft Skills</h2>
        <ul>
          <li>Problem Solving</li>
          <li>Teamwork</li>
          <li>Adaptability</li>
          <li>Organisation</li>
        </ul>
      </div>
      <div>
        <h2>Technical Skills</h2>
        <p>
          I am a very profficient developer, working constantly on new
          technologies and delivering fully fledged products to clients. I have
          experience in many coding languages, but pride myself in my
          adaptability to the project at hand and finding ways to solve problems
          regardless of the stack, either way heres a list of languages and
          technologies I often use:
        </p>
        <ul>
          <li>Javascript (Vanilla, React, Vue, Node)</li>
          <li>HTML</li>
          <li>CSS (also sass)</li>
          <li>PHP</li>
          <li>SQL, MongoDB</li>
          <li>REST, Graphql</li>
        </ul>
        <p>
          Apart from coding I also adopt the responsability for everything back
          end. Currently that usually amounts to developing plans for CMS
          schemas to ensure the best route for data storage and manipulation,
          also helping in eventual handoff and explaining to clients how to use
          their new system. On some of my newer projects the requirements extend
          out from simple CMS structures to fully designed and developed
          databases; these stem from SQL databases to non-relational databases
          created with MongoDB.
        </p>
      </div>
    </section>
    <section>
      <h2>Get in touch with me</h2>
      <p>
        Got a project you want to discuss? Want to talk about code? Whatever the
        reason don't hesitate to hit me up at aiden.e.barrett@gmail.com and I'll
        get back to you as soon as I can.
      </p>
      <Link className="button-link" to="/contact">
        Lets talk
      </Link>
    </section>
  </Layout>
)

export default IndexPage
