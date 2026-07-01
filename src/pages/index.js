import * as React from "react"
import CrosswordGrid from "../components/CrosswordGrid"
import MyAppBar from "../components/MyAppBar"

import a from "../components/outfile"
const IndexPage = () => {

  return (
  <main>
    <MyAppBar></MyAppBar>
    <header><h1 style ={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>Puzzle Name: Medicine20-1</h1></header>


    <CrosswordGrid crossword={a}></CrosswordGrid>


  </main>)
}

export default IndexPage

export const Head = () => <title>Home Page</title>
