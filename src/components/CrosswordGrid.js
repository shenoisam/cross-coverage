import * as React from "react"
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import { useEffect, useState} from "react";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { useStaticQuery, graphql } from "gatsby"


// Arrow function (common and often preferred)
const CrosswordGrid = (props) => {
    const [gsize, setGSize] = useState(0);
    const [acrossClues, setAcrossClues] = useState([])
    const [downClues, setDownClues] = useState([])
    const [data,setData] = useState({})

    const black_out_color = "grey"
    useEffect(() => {
        //Load the puzzle that was selected
        setData(props.crossword)

        setGSize(props.crossword["size"]?props.crossword["size"] : 0 )
        setAcrossClues([])
        setDownClues([])
    },[props]);
    useEffect(()=>{

      var down = []
      var across = []
      if(gsize > 0){
        var words = data["words"]
        words.map((w) =>{
          var id = w['row'] * data["size"] +  w['col']

          //Generate the white sections
          var myElement = document.getElementById(id);
          myElement.style.backgroundColor = "white"

          // Will need to ensure that across and down numbers are represented
          var n = myElement.querySelector('.num')
          if(n.textContent === "X"){
            n.textContent = w['num']
          }else{
            n.textContent = n.textContent +"," + w['num']
          }

          n.style = { position: 'relative', top: '-0.5em', fontSize: '80%'}


          // Now have to unblacken the across and down parts
          if(w['isDown'] === 0){
            for(var i = id; i< id + w['size']; i++){
              myElement = document.getElementById(i);
              myElement.style.backgroundColor = "white"
            }
            across.push(w)

          }else{
            for(i = 0; i< w['size']; i++){
              myElement = document.getElementById(id + data["size"]*i);
              myElement.style.backgroundColor = "white"

            }
            down.push(w)

          }
          n.style.color =  w['isDown'] === 0 ? "blue" : "red"

        })
        across.sort((a, b) => a.num - b.num)
        setAcrossClues(across)
        down.sort((a, b) => a.num - b.num)
        setDownClues(down)
      }

    },[gsize])

    function solve(){
      var words = data["words"]
      words.map((w) =>{
        var id = w['row'] * data["size"] +  w['col']
        var myElement = document.getElementById(id);
        myElement.querySelector('.text').textContent = w['word'][0]

        if(w['isDown'] === 0){
          const range = Array.from({ length: w['size'] -1}, (_, i) => i + 1)
          range.map((i) => {
              var myElement = document.getElementById(i + id);
              myElement.querySelector('.text').textContent = w['word'][i]
            })

        }else{
            const range = Array.from({ length: w['size']-1 }, (_, i) => i + 1)
            range.map((i) => {
              var myElement = document.getElementById(id + data["size"]*(i));
              myElement.querySelector('.text').textContent = w['word'][i]

            })
          }
      })
    }


    async function handleClick(params){
        const myElement = document.getElementById(params);
        if(myElement.querySelector('.contain').style.backgroundColor !== "black_out_color"){
            await waitingKeypress(myElement);
        }

    }
    function  waitingKeypress(elem) {
        return new Promise((resolve) => {
            document.addEventListener('keydown', onKeyHandler);
            function onKeyHandler(e) {
                if(isCharLetter(e.key) ){
                    elem.querySelector('.text').textContent = e.key.toUpperCase();
                    document.removeEventListener('keydown', onKeyHandler);
                    resolve();
                }else if(isNumeric(e.key)){
                  elem.querySelector('.text').textContent = e.key;
                  document.removeEventListener('keydown', onKeyHandler);

                }

            }
        });
    }

    function isCharLetter(str) {return str.length === 1 && str.match(/[a-z]/i);}
    function isNumeric(str) {
        if (typeof str !== 'string') return false; // Ensure it's a string
        return !isNaN(parseFloat(str)) && isFinite(Number(str));
    }
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid
        container
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
        columns={gsize}
      >
        {[...Array(gsize*gsize)].map((_, index) => (
          <Grid
            style={{backgroundColor:black_out_color}}
            key={index}
            id={index}
            minHeight={50}
            size={{
              xs: 1,
            }}
            onClick={() => {handleClick(index)}}
          >
            <div className="contain" >
              <span className="num" style={{ position: 'relative', top: '-0.5em', fontSize: '80%', visibility:'hidden' }}>X</span>
              <div className="text"  style={{textAlign:'center'}}></div>
          </div>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Button onClick={solve}>Solve Puzzle</Button>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={6}>
        <ListItem><h3 style={{color:"blue"}}>Across</h3></ListItem>
        {acrossClues.map((e) =>{
          return (<div key={e["num"]}>
           <p>{e["num"]}:{e["clue"]}</p>
          </div>)
        })}

      </Grid>
      <Grid size={6}>
        <ListItem><h3 style={{color:"red"}} >Down</h3></ListItem>
        {downClues.map((e) =>{
          return (<div key={e["num"]}>
           <p>{e["num"]}:{e["clue"]}</p>
          </div>)
        })}

      </Grid>

    </Grid>
    </>

      )
};

export default CrosswordGrid