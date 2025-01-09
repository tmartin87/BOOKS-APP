import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AllBooksPage from "./pages/AllBooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import UserBooksPage from "./pages/UserBooksPage";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-books" element={<AllBooksPage />} />
            <Route path="/book/:bookId/:bookStatus" element={<BookDetailsPage />} />
            <Route path="/my-books" element={<UserBooksPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
