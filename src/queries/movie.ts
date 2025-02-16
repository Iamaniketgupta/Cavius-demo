import axiosInstance from "../api/axios"
// const TOKEN: string = import.meta.env.VITE_ACCESS_TOKEN.trim();

const headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE2ZjgyZWNlNmY3MGM5NzQzNzAyYTMxZmM4MWFiYSIsIm5iZiI6MTczOTI4NDU0My43NTYsInN1YiI6IjY3YWI2MDNmYTJlMmY5OWVkNGJiM2RkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MTN9S8YaZTYRIvQH-49qFaqu9UtJQoPsLzntlT8QAU8"
}
export const getPopularMovies = async () => {
    try {
        const res = await axiosInstance.get(`/movie/popular?language=en-US&page=1`, {
            headers
        })
        // console.log({pop:res.data.results})
        return res.data.results

    } catch (error) {
        console.log(error)
    }
}
export const getNowPlayingMovies = async () => {
    try {
        const res = await axiosInstance.get(`/movie/now_playing?language=en-US&page=1`, {
            headers
        })
        // console.log({lat:res.data.results})

        return res.data.results

    } catch (error) {
        console.log(error)
    }
}
export const getTopRatedMovies = async () => {
    try {
        const res = await axiosInstance.get(`/movie/top_rated?language=en-US&page=1`, {
           headers
        })
        // console.log({top:res.data.results})

        return res.data.results

    } catch (error) {
        console.log(error)
    }
}
export const getUpComingMovies = async () => {
    try {
        const res = await axiosInstance.get(`/movie/upcoming?language=en-US&page=1`, {
           headers
        })
        // console.log({up:res.data.results})

        return res.data.results

    } catch (error) {
        console.log(error)
    }
}
export const searchMovies = async (query: string) => {
    if (!query)
        return;
    try {
        const res = await axiosInstance.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
           headers
        })
        // console.log({search:res.data.results})

        return res.data.results

    } catch (error) {
        console.log(error)
    }
}





