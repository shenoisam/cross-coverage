import React from "react";
import { useEffect, useState} from "react";
import CrosswordGrid from "../components/CrosswordGrid";
import MyAppBar from "../components/MyAppBar";



export default function CrosswordPuzzle(props) {
  const [puzzle,setPuzzle] = useState({})
  const [name, setName] = useState("")


   useEffect(() => {
        if(props){
          setPuzzle(JSON.parse(props.pageContext.content))
          setName(props.pageContext.id.replace(/\.json$/, ""))
        }

      },[props.pageContext]);

  return (
    <div>
      <MyAppBar></MyAppBar>
      <h1 style ={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>Puzzle Name: {name}</h1>
      <CrosswordGrid crossword={puzzle}></CrosswordGrid>
    </div>
  );
}