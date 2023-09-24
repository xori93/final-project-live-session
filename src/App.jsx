import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import CategoryArticle from './Pages/CategoryArticle/CategoryArticle'
import Header from './Components/Header/Header'
import Auth from './Pages/Auth/Auth'
import AddArticle from './Pages/AddArticle/AddArticle'
import ArticleDetails from './Pages/ArticleDetails/ArticleDetails'





function App() {


  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="auth" element={<Auth/>} />
        <Route path="/addarticle" element={<AddArticle/>} />
        <Route path="/category/:categoryName" element={<CategoryArticle/>} />
        <Route path="/article/:articleId" element={<ArticleDetails/>} />
        
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
