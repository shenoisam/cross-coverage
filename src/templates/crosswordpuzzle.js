import React from "react";
import { useEffect, useState} from "react";
import CrosswordGrid from "../components/CrosswordGrid";



export default function CrosswordPuzzle(props) {
  const [puzzle,setPuzzle] = useState({})


   useEffect(() => {
        if(props){
          setPuzzle(JSON.parse(props.pageContext.content))
        }

      },[props.pageContext]);

  return (
    <div>
      <CrosswordGrid crossword={puzzle}></CrosswordGrid>
    </div>
  );
}