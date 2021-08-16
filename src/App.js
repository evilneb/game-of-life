import Grid from './grid-components/grid';
import Cell from './grid-components/cell';
import Row from './grid-components/row';

import produce from 'immer';

import { useState, useEffect } from 'react';

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
      propogate(grid, 500);
  });
  
  return (
    <>
    <div className="min-w-full min-h-screen flex flex-row p-2 bg-gray-700">
      <div className="flex flex-col mr-2">
        <button className="bg-green-500 hover:bg-green-700 text-white rounded font-bold px-2 py-1 mb-1" onClick={() => setTimeTicking(!timeTicking)}>{timeTicking ? "Cease" : "Propogate"}</button>
        <button className="bg-green-500 hover:bg-green-700 text-white rounded font-bold px-2 py-1" onClick={() => propogate(grid, 0)}>Increment</button>
      </div>
      
      <div className="flex flex-col">
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
    </div>
    </>
  );

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

  function propogate(grid, speed) {
    setTimeout(() => {
      const nextGrid = produce(grid, gridDraft => {
        for(let y = 0; y < grid.length; y++) {
          for(let x = 0; x < grid[y].length; x++) {
            const cell = grid[y][x];
            gridDraft[y][x] = {
              alive: determinePropogation(cell, grid),
              coordinates: { X: x, Y: y }
            };
          }
        }
      });

      setGrid(nextGrid);
    }, speed);

    function determinePropogation(cell, grid) {
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
}

export default App;
