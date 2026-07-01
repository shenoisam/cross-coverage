import * as React from "react"
import MyAppBar from "../components/MyAppBar"
import ListPuzzles from "../components/ListPuzzles"

const PuzzlePage = () => {

  return (
  <main>
    <MyAppBar></MyAppBar>
    <ListPuzzles></ListPuzzles>


  </main>)
}

export default PuzzlePage

export const Head = () => <title>Puzzle Page</title>
