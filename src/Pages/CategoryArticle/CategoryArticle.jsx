import React, { useEffect, useState } from 'react'
import "./CategoryArticle.css"
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import ArticleCard from '../../Components/ArticleCard/ArticleCard'


function CategoryArticle() {

  const { categoryName } = useParams()

  const [articles, setArticles] = useState([])

  useEffect(
    () => {
      // create a reference to firestore bd collection
      const articleRef = collection(db, "Articles")

      // now create query 
      const q = query(articleRef, where("category", "==", categoryName))

      // now get data that matches the query
      getDocs(q, articleRef)
        .then(res => {
          const articles = res.docs.map(item => ({
            ...item.data(),
            id: item.id,
          }))
          setArticles(articles)
        })

        .catch((err) => console.log(err))


    }, []
  )

  return (
    <div className="category-article">
      {
        articles.map((item) => (<ArticleCard article = {item}/>))
      }
      {categoryName}
    </div>
  )
}

export default CategoryArticle