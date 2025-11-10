import * as React from "react"
import CrosswordGrid from "../components/CrosswordGrid"

const IndexPage = () => {

  return (<main>
    <CrosswordGrid size="20"></CrosswordGrid>
  </main>)
}

export default IndexPage

export const Head = () => <title>Home Page</title>
