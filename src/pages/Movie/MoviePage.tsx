import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Hero from "../../components/Movie/Hero";
import ReviewCrousal from "../../components/Movie/ReviewCrousal";
import MovieDetail from "../../components/Movie/MovieDetail";
import Loader from "../../components/commons/Loader";
import { searchMovies } from "../../queries/movie";

interface Movie {
  id: number;
  overview: string;
}

export default function MoviePage() {
   const {id} = useParams();

   const [movieData, setMovieData] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        setError("Invalid movie ID.");
        return;
      }
 
      try {
        setLoading(true);
        const response = await searchMovies(id);
        // console.log(response)
        setMovieData(response.data);
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Failed to load movie details. Please try again later.");
      }
      finally{
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  return (
    <>
    {
      loading?
        <div className = "text-white flex items-center min-h-72 bg-black03 justify-center">< Loader /></div >:
  <div className="bg-black03 text-white min-h-full">
    {error ? (
      <div className="p-10 text-center h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    ) : (
      <>
        <Hero movieData={movieData} />

        {/* Content Container */}
        <div className="p-5 md:p-10 lg:p-20 w-full flex flex-col items-center">
          <div className="flex flex-col lg:flex-row gap-6 justify-center max-w-6xl w-full">

            <div className="flex-1 w-full">
              {/* Description */}
              <div className="rounded-lg text-sm bg-black10 text-white border border-black15 p-6 md:p-10">
                <h3 className="text-gray60 mb-2">Description</h3>
                <p className="text-sm">{movieData?.overview}</p>
              </div>

              {/* Reviews Crousal */}
              <div className="mt-5 bg-black10 rounded-lg text-sm text-white border border-black15 p-6 md:p-10">
                <ReviewCrousal />
              </div>
            </div>

            {/* Right Content - Movie Details */}
            <div className="w-full lg:w-1/3">
              <MovieDetail movieData={movieData} />
            </div>
          </div>
        </div>
      </>
    )}
  </div>
}
</>

  );
}
