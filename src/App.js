import Grid from './grid-components/grid';
import Cell from './grid-components/cell';
import Row from './grid-components/row';

import produce from 'immer';

import { useState, useEffect } from 'react';

function initializeGrid(model) {
  const cellGrid = [];
  for(let y = 0; y < model.height; y++) {
    const cells = [];
    for(let x = 0; x < model.width; x++) {
      const cell = {
        alive: model.cellStates[y + x],
        coordinates: { X: x, Y: y }
      }
      cells.push(cell);
    }
    cellGrid.push(cells);
  }
  return cellGrid;
}

const rowCount = 30;
const columnCount = 50;

const model = {
  width: columnCount,
  height: rowCount,
  cellStates: Array(columnCount * rowCount).fill(0)
}

function App() {

  const [grid, setGrid] = useState(() => initializeGrid(model));

  const [timeTicking, setTimeTicking] = useState(false);

  useEffect(() => {
    if(timeTicking)
      propogate(500);
  });
  
  function propogate(ms) {
    setTimeout(() => {
      const nextGrid = produce(grid, gridDraft => {
        for(let y = 0; y < grid.length; y++) {
          for(let x = 0; x < grid[y].length; x++) {
            const cell = grid[y][x];
            gridDraft[y][x] = {
              alive: determinePropogation(cell),
              coordinates: { X: x, Y: y }
            };
          }
        }
      });

      setGrid(nextGrid);

      return !timeTicking;
    }, ms);

    function determinePropogation(cell) {
      const x = cell.coordinates.X;
      const y = cell.coordinates.Y;
      const neighbors = [
        grid[y-1]?.[x-1],
        grid[y]?.[x-1],
        grid[y+1]?.[x-1],
        grid[y-1]?.[x],
        grid[y+1]?.[x],
        grid[y-1]?.[x+1],
        grid[y]?.[x+1],
        grid[y+1]?.[x+1]
      ];
      const neighborCount = neighbors.filter(neighbor => neighbor !== undefined && neighbor.alive).length;
      const willPropogate = (cell.alive && neighborCount === 2) || neighborCount === 3; 
      return willPropogate;
    }
  }
  
  function handleClick(cell) {
    const y = cell.coordinates.Y;
    const x = cell.coordinates.X;
    setGrid(produce(grid, gridDraft => {
      gridDraft[y][x] = {
        alive: cell.alive ? false : true,
        coordinates: { X: x, Y: y }
      };
    }));
  }
  
  return (
    <>
    <button className="bg-green-500 hover:bg-green-700 text-white rounded font-bold" onClick={() => setTimeTicking(!timeTicking)}>{timeTicking ? "Halt" : "Flow"}</button>
    <button className="bg-green-500 hover:bg-green-700 text-white rounded font-bold" onClick={() => propogate(0)}>Step</button>
    <div className="min-h-screen flex flex-col justify-center">
      <div className="mx-auto">{
        <Grid grid={grid.map((row, y) => 
            <Row 
              key={y} 
              cells={row.map((cell, x) => 
                  <Cell 
                    key={`${x},${y}`} 
                    cell={cell} 
                    changeState={handleClick} 
                  />
                )} />
          )} />
        }
      </div>
    </div>
    </>
  );
}

export default App;
