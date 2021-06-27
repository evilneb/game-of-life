import Row from './row';

function Grid(props) {
  let rows = [];
  for(let i = 1; i<=props.rowCount; i++) {
    rows.push(<Row cellCount={props.columnCount} key={i} rowPosition={i} />);
  }
  return (
    <div className="Grid">
      {rows}
    </div>
  );
}

export default Grid;