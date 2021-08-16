
function Cell(props) {
  const cell = props.cell;
  const handleClick = () => props.changeState(cell);
  return (
    <div 
      className={`Cell border border-gray-600 w-5 h-5 ${cell.alive ? "bg-gray-500" : ""}`}
      onClick={handleClick}>
    </div>
  );
}

export default Cell;