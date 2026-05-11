import Navbar from "./components/Navbar";
import MainDashboard from "./components/MainDashboard/MainDashboard";
import TopRecommendations from "./components/MainDashboard/TopRecomendations";
import GeneralRecomendations from "./components/MainDashboard/GeneralRecomendations";
import ReviewPage from "./components/MainDashboard/ReviewPage";
import Footer from "./components/MainDashboard/Footer";
// import axios from "axios";
// import { useEffect, useState } from "react";

function App() {

  // const [data,setData] = useState([])
  // useEffect(() => {
  //   async function res() {
  //     const response = await axios.get("http://127.0.0.1:8000/api/hotels?page=2");
  //     setData(response.data)
  //   }
  //   res();
  // }, []);

  return (
    <>
      <div className="sticky top-0 left-0 z-100">
        <Navbar />
      </div>
      <MainDashboard />
      <TopRecommendations />
      <GeneralRecomendations />
      <ReviewPage />
      <Footer />
    </>
  );
}

export default App;
