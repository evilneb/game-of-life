
function Cell(props) {
  const cell = props.cell;
  const handleClick = () => props.changeState(cell);
  return (
    <div 
      className={`Cell border border-solid border-gray-900 m-0.5 w-4 h-4 ${cell.alive ? "bg-black" : ""}`}
      onClick={handleClick}>
    </div>
  );
}

export default Cell;