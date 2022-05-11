import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "../styled/Globalcss";
import CreateRecipe from "../pages/CreateRecipe";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import RecipeList from "../pages/RecipeList";
import Search from "../pages/Search";
import Header from "./Header";
import LoginModal from "./Modal/LoginModal";
import Test from "../pages/test";

export const Routers = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <LoginModal />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipelist" element={<RecipeList />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/recipelist/:id" element={<Detail />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};
