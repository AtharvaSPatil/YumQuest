// import React from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
document.title = "YumQuest!";
type Tabs = "search" | "favourites";
const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavouriteRecipes();
  }, []);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app-container">
      <div className="header">
        <ul className="nav">
          <li id="name"><IoFastFood size={25}/>
YumQuest</li>
          <li onClick={() => setSelectedTab("search")}>
            Search <FaSearch size={20}/>
          </li>
          <li onClick={() => setSelectedTab("favourites")}>Favourites</li>
        </ul>
      </div>
      <div className="tabs">
        {/* <h1 onClick={() => setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={() => setSelectedTab("favourites")}>Favourites</h1> */}
      </div>
      <div className="main-content">
        <div className="search-tab">
          {selectedTab === "search" && (
            <>
              <div className="form-container">
              <form
                className="form"
                onSubmit={(event) => handleSearchSubmit(event)}
              >
                <input
                  type="text"
                  required
                  placeholder="Search Your Magic..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="search-bar-search"
                />
                <button type="submit" className="submit-button"><FaSearch size={20} color="#FCAEAE"/></button>
              </form>
              </div>
              <div className="recipes-grid">
                {recipes.map((recipe) => {
                  const isFavourite = favouriteRecipes.some(
                    (favRecipe) => recipe.id === favRecipe.id
                  );
                  return (
                    <RecipeCard
                      recipe={recipe}
                      onClick={() => setSelectedRecipe(recipe)}
                      onFavouriteButtonClick={
                        isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
                      }
                      isFavourite={isFavourite}
                    />
                  );
                })}
              </div>

              <div className="btn-space">
              <button
                className="view-more-button"
                onClick={handleViewMoreClick}
              >
                <FaPlus size={20} color="#FF6666"/>
              </button>
              </div>
            </>
          )}
        </div>

        <div className="favourites-tab">
          {selectedTab === "favourites" && (
            <>
              <div>This is Favorites</div>
              <div className="recipes-grid">
              {favouriteRecipes.map((recipe) => {
                return (
                  <RecipeCard
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                    onFavouriteButtonClick={removeFavouriteRecipe}
                    isFavourite={true}
                  />
                );
              })}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;
