
import Navbar from './components/Navbar'
import MainDashboard from './components/MainDashboard/MainDashboard'
import TopRecommendations from './components/MainDashboard/TopRecomendations'
import GeneralRecomendations from './components/MainDashboard/GeneralRecomendations'
import ReviewPage from './components/MainDashboard/ReviewPage'
import Footer from './components/MainDashboard/Footer'

function App() {
  return (
    <>
    <div className='sticky top-0 left-0 z-100'>
      <Navbar />
    </div>
      <MainDashboard />
      <TopRecommendations />
      <GeneralRecomendations />
      <ReviewPage />
      <Footer />
    </>
  )
}

export default App
