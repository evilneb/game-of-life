import Cell from './cell';

function Row(props) {
  let cells = [];
  for(let i = 1; i<=props.cellCount; i++) {
    let cellKey = i.toString() + "," + props.rowPosition.toString()
    cells.push(<Cell key={cellKey}/>);
  }
  return (
    <div className="Row flex flex-row">
      {cells}
    </div>
  );
}

export default Row;