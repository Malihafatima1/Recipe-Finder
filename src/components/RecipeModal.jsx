function RecipeModal({ meal,onClose }){
     if (!meal) return null;
     
     //collecting all ingredients  and measure pairs
     const ingredients=[];
     for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        const measure=meal[`strMeasure${i}`];
        if(ingredient && ingredient.trim()!==''){
            ingredients.push(`${ingredient}-${measure}`)
        }
     }

    return(
        <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
        >
            <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full relative shadow-xl overflow-y-auto max-h-[90vh]"
            onClick={(e)=>e.stopPropagation()}>
                <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                onClick={onClose}
                >
                     ✖    
                </button>

                <img src={meal.strMealThumb}
                 alt={meal.strMeal} 
                className="rounded-xl mb-4 w-full object-cover h-50"
                />

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                    {meal.strMeal}
                </h2>
               
               <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Ingredients
               </h3>
               <ul className="list-disc list-inside text-gary-600 space-y-1 mb-4">
                {ingredients.map((item,index)=>(
                    <li key={index}>{item}</li>
                ))}
               </ul>

               <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Instructions
               </h3>
               <p className="text-gray-600 text-sm whitespace-pre-line mb-4">
                {meal.strInstructions}
               </p>

               {meal.strYoutube &&(
                <a  href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-red-500 text-white py-2 rounded-ld hover:bg-red-600 transition">
                     🎥 Watch on YouTube
                </a>
               )}
            </div>

        </div>
    );
}

export default RecipeModal