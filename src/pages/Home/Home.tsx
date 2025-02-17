import { useSelector } from "react-redux";
import Loader from "../../components/commons/Loader";
import Hero from "../../components/Homepage/Hero";
import ListSlider from "../../components/Homepage/movieSlider/ListSlider";
import { RootState } from "../../store/store";

interface Props {
  loading: boolean;
  error: string | null;
}
export default function Home({ loading, error }: Props) {
  const movies = useSelector((state: RootState) => state.movies);
  
  return (
    <main className="bg-black03 overflow-x-hidden" >
      <Hero />
      {loading ? <div className="text-white flex items-center h-60 justify-center">
        <Loader /></div> :
        error ? <div className="text-white flex items-center h-60 justify-center">{error}</div> :

          <div className="px-4 md:px-8 mt-20 lg:px-20 h-full">
            <div className="md:px-4 py-10 shadow-10">

              <section id="geners" className="mb-10">
                <ListSlider title="Our Genres" data={movies.popular} />
              </section>

              <section id="upcoming" className="mb-10">
                <ListSlider title="Upcoming Bangers" data={movies.upcoming} />
              </section>


              <section id="latest" className="mb-10">
                <ListSlider title="Latest on Cavius" data={movies.latest} />
              </section>

              <section id="toprated" className="mb-10">
                <ListSlider title="Top Rated" data={movies.toprated} />
              </section>

              <section id="popular" className="mb-10">
                <ListSlider title="Popular" data={movies.popular} />
              </section>

            </div>
          </div>
      }

    </main>
  );
}
