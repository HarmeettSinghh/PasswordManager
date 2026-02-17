import "./App.css";
import Navbar from "./Components/navbar";
import Manager from "./Components/Manager";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div className=" flex flex-col"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(90deg, #EBF4F5 0%, #B5C6E0 100%)",
        }}
      >
        <Navbar />
        <div className="flex-grow">
         <Manager />
        </div>
       
        <Footer className="fixed bottom-0 left-0 w-full" />
      </div>
    </>
  );
}

export default App;
