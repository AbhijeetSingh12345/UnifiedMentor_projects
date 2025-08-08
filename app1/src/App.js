
import './App.css';
 import About from './components/About';
import DarkModeToggle from './components/darkmode';
import Navbar from './components/Navbar';
// import Textform from './components/Textform';



function App() {
  return (
    <>

<Navbar title="TextUtils" dropdown="Dropdown Menu" />
<div>
  <DarkModeToggle></DarkModeToggle>
</div>
<div className='container'>
  {/* { <Textform heading="Enter your text here::"/> } */}
  <About></About>
</div>
    </>
  );
}

export default App;
