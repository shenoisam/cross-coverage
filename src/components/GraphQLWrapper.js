import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import CrosswordGrid from './CrosswordGrid'
import { useEffect, useState} from "react";
const Layout = ({ pageTitle, children }) => {
  const [puzzle,setPuzzle] = useState({})

  const data = useStaticQuery(graphql`
   query MyQuery {
      allMyS3Object {
        nodes {
          key
          content
        }
      }
    }
  `)
  useEffect(() => {
      if(data){
        setPuzzle(JSON.parse(data.allMyS3Object.nodes[1].content))
      }

    },[data]);

  return (
    <div >
      <header>{data.allMyS3Object.nodes[0].key}</header>

      <main>
        <CrosswordGrid crossword={puzzle}></CrosswordGrid>

      </main>
    </div>
  )
}



export default Layout