import {  useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeModal from "./components/RecipeModal";
import Loader from "./components/Loader";

function App() {
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [select, setSelect] = useState(null);

  //Auto detect API logic
  const fetchRecipes = async () => {
    if (!query.trim()) {
      setError("Please enter any ingredients or recipe name.");
      return;
    }
    setLoading(true);
    setError("");
    setRecipe([]);

    try {
      let endpoint;
      if (query.trim().includes(" ")) {
        //Multi-word likely recipe name
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      } else {
        //Single word -- try ingredients
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
      }
      const res = await fetch(endpoint);
      const data = await res.json();

      //If ingredient return nothing,try name search
      if (!data.meals && !query.trim().includes(" ")) {
        const Resname = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const nameData = await Resname.json();
        if (nameData.meals) {
          setRecipe(nameData.meals);
        } else {
          setError("No recipes found.");
        }
      } else if (data.meals) {
        setRecipe(data.meals);
      } else {
        setError("No recipes found.");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    } finally {

    setLoading(false);
    setQuery('');
    }
  };

  //fetch recipes details
  const fetchRecipeDetails=async(id)=>{
    try{
      const res= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data=await res.json();
      if(data.meals && data.meals[0]){
        setSelect(data.meals[0]);
      }
    }catch(error){
      console.log("Error fetching recipe details:", error);
    }
  };

  //fetching random recipies
  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError("");
    setRecipe([]);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setRecipe(data.meals || []);
     
    } catch (err) {
      setError("Failed to fetch random recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={fetchRecipes}
          onRandom={fetchRandomRecipe}
          onClear={() => {
            setQuery("");
            setRecipe([]);
            setError("");
          }}
        />

        {/* *Feedback messages*/}
        <div className="text-center my-4">
          {loading && <Loader/>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && recipe.length > 0 && (
            <p>
              {recipe.length} recipe{recipe.length > 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Recipe Results*/}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
          {recipe.map((meal) => (
            <div
              key={meal.idMeal}
              onClick={() => fetchRecipeDetails(meal.idMeal)}

              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer"
              >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {meal.strMeal}
                </h2>
              </div>
            </div>
          ))}
        </section>
        {select && (
        <RecipeModal meal={select} onClose={()=>setSelect(null)}/>
      ) }
      </main>
      

      {/* footer*/}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-8 bg-gray-50 dark:bg-gray-900 mt-12">
       <div className="max-w-5xl mx-auto px-4">
         <p>Built by Maliha Fatima • Powered by <a href="https://www.themealdb.com" className="text-indigo-600 hover:underline">TheMealDB API</a></p>
       </div>
     </footer>
     
    </div>
  );
}
export default App;
