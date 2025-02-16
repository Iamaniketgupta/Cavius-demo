
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import MoviePage from './pages/Movie/MoviePage'
import NavBar from './components/Homepage/NavBar'
import Footer from './components/Homepage/Footer'
import { useEffect, useState } from 'react'
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpComingMovies } from './queries/movie'

function App() {

const [movies, setMovies] = useState({
  popular: [],
  toprated: [],
  latest: [],
  upcoming: []
});
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const { popular, toprated, latest, upcoming, } = useSelector((state) => state.movies);
  const fetchData = async () => {
    try {

      setLoading(true);
      const [popularMovies, topRatedMovies, nowPlayingMovies, upComingMovies] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getNowPlayingMovies(),
        getUpComingMovies()
      ]);

      setMovies({
        popular: popularMovies ,
        toprated: topRatedMovies,
        latest: nowPlayingMovies,
        upcoming: upComingMovies
      });
     
    } catch (err) {
      console.log(err.response.data.status_message)
      // setError(err.response.data.status_message);
     
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
        <Route path='/' element={<Home movies={movies} loading={loading} error={error}/>}></Route>
        <Route path='/movie/:id' element={<MoviePage />}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
