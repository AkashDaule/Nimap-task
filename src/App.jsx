import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header/Header'
import Home from './Component/Home/Home'
import TopRated from './Component/TopRated/TopRated'
import Upcoming from './Component/Upcoming/Upcoming'
import MovieOverView from './Component/MovieOverView/MovieOverView'
import SearchMovies from './Component/Search/SearchMovies';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieOverView />} />
          <Route path="/search" element={<SearchMovies />} />
        </Routes>
      </Router>


    </>
  )
}

export default App
