const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesApi = async (page) => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }
    return response.json();
};

export const fetchTopRatedMovies = async (page) => {
    // No need to redefine API_KEY and BASE_URL here; use the constants defined above
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch top-rated movies");
    }

    const data = await response.json();
    console.log("API Response:", data); // Debug the API response
    return data;
};

// Fetch upcoming movies
export const fetchUpcomingMovies = async (page) => {
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }
    const data = await response.json();
    console.log("Upcoming Movies API Response:", data); // Debug the API response
    return data;
};


