import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import CrosswordGrid from './CrosswordGrid'
import { useEffect, useState} from "react";
const ListPuzzles = ({ pageTitle, children }) => {
  const [puzzles,setPuzzles] = useState([])

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
        console.log(data['allMyS3Object']['nodes'])
        setPuzzles(data['allMyS3Object']['nodes'])
      }

    },[data]);

  return (
    <div >
      <header><h1 style ={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>Puzzles</h1></header>

      <main>
         {puzzles.map((puz) =>{
            return (
                <p>
                    {puz.key}

                </p>
            )
        })}



      </main>
    </div>
  )
}



export default ListPuzzles