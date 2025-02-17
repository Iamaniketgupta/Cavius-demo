
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import MoviePage from './pages/Movie/MoviePage'
import NavBar from './components/Homepage/NavBar'
import Footer from './components/Homepage/Footer'
import { useEffect, useState } from 'react'
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpComingMovies } from './queries/movie'
import { useDispatch } from 'react-redux'
import { setMovies } from './store/slices/movieSlice'

function App() {

  const dispach = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {

      setLoading(true);
      const [popularMovies, topRatedMovies, nowPlayingMovies, upComingMovies] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getNowPlayingMovies(),
        getUpComingMovies()
      ]);

      dispach(setMovies({
        popular: popularMovies,
        toprated: topRatedMovies,
        latest: nowPlayingMovies,
        upcoming: upComingMovies
      }));

    } catch (err) {
      console.log('Something went wrong', err)
      setError("Failed to load movie details. Please try again later.");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home  loading={loading} error={error} />}></Route>
        <Route path='/movie/:id' element={<MoviePage />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
