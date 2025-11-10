import * as React from "react"
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import { useEffect} from "react";


// Arrow function (common and often preferred)
const CrosswordGrid = (props) => {
    useEffect(() => {
        const myElement = document.getElementById('10');
        myElement.style.backgroundColor = "black"
    },[]);
    async function handleClick(params){
        const myElement = document.getElementById(params);
        if(myElement.querySelector('.contain').style.backgroundColor !== "black"){
            await waitingKeypress(myElement);
        }

    }
    function  waitingKeypress(elem) {
        return new Promise((resolve) => {
            document.addEventListener('keydown', onKeyHandler);
            function onKeyHandler(e) {
                if(isCharLetter(e.key)){
                    elem.querySelector('.text').textContent = e.key.toUpperCase();
                    document.removeEventListener('keydown', onKeyHandler);
                    resolve();
                }

            }
        });
    }

    function isCharLetter(str) {return str.length === 1 && str.match(/[a-z]/i);}
  return (
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
        columns={props.size}
      >
        {[...Array(props.size * props.size)].map((_, index) => (
          <Grid
            key={index}
            id={index}
            minHeight={50}
            size={{
              xs: 1,
            }}
            onClick={() => {handleClick(index)}}
          >
            <div className="contain">
              <span style={{ position: 'relative', top: '-0.5em', fontSize: '80%' }}>1</span>
              <div className="text"  style={{textAlign:'center'}}>T</div>
          </div>
          </Grid>
        ))}
      </Grid>
    </Box>

      )
};

export default CrosswordGrid