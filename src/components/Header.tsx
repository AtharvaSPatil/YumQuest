import { useState } from "react";
import { IoSearch } from "react-icons/io5";

type Tabs = "search" | "favourites";
const Header = () => {
    const [, setSelectedTab] = useState<Tabs>("search");
    return (
    <div>
        <div className="header">
        <ul className="nav">
          <li>YumQuest</li>
          <li onClick={() => setSelectedTab("search")}>
            Search <IoSearch size={20} />
          </li>
          <li onClick={() => setSelectedTab("favourites")}>Favourites</li>
        </ul>
      </div>
    </div>
    );
};

export default Header;


// Enter in App.tsx if app crashes

