import './App.css';
import ListToListProvider from './ListToListContext';
import People from './People';

function App() {
  return (
    <>
      <div className={`
        bg-blue-700 h-20 flex items-center 
        justify-center text-white`}>
        <h1 className='text-2xl'>List to List</h1>
      </div>
      <div className="container mt-4 mx-auto flex justify-center">
        <ListToListProvider>
          <People />
        </ListToListProvider>
      </div>
    </>
  );
}

export default App;
