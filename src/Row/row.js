import './row.css';
import Cell from '../Cell/cell';

function Row() {
  return (
    <div className="Row flex flex-row">
        <Cell></Cell>
        <Cell></Cell>
    </div>
  );
}

export default Row;