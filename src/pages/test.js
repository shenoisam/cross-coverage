import * as React from "react"
import CrosswordGrid from "../components/CrosswordGrid"
import MyAppBar from "../components/MyAppBar"
import Layout from "../components/GraphQLWrapper"
import a from "../components/outfile"

const TestPage = () => {

  return (
  <main>
    <MyAppBar></MyAppBar>
    <CrosswordGrid crossword={a}></CrosswordGrid>

  </main>)
}

export default TestPage

export const Head = () => <title>Home Page</title>
