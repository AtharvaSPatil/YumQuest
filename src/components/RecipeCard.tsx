import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
  isFavourite: boolean;
}
const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavourite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="" />
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        >
          {isFavourite ? (
            <AiFillHeart className="heart" size={25} color="red" />
          ) : (
            <AiOutlineHeart className="heart" size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
