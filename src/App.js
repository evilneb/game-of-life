import Grid from './grid';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="mx-auto">
        <Grid rowCount={30} columnCount={30} />
      </div>
    </div>
  );
}

export default App;
