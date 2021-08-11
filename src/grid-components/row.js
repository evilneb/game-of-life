function Row(props) {
  return (
    <div className="Row flex flex-row">
      {props.cells}
    </div>
  );
}

export default Row;