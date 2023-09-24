import React, { useEffect, useState } from "react";
import "./Banner.css";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [mainArticle, setMainArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);

  // get data when the banner loads
  useEffect(() => {
    // create a variable to reference the articles
    const articleRef = collection(db, "Articles");

    // set up query to filter responses
    // sort and then get latest 5 articles
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(5));

    // get articles from db

    getDocs(q, articleRef)
      .then((res) => {
        console.log(res.docs[0].data());

        const articles = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));

    //console.log("articles", articles);

        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
        onClick={() => navigate(`/article/${mainArticle?.id}`)}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="other-articles-container">
        {otherArticles.map((item) => (
          <div
            className="other-article-item"
            style={{ backgroundImage: `url(${item?.imageUrl})` }}
            onClick={() => navigate(`/article/${item?.id}`)}
          >
            <div className="banner-info">
              <h3>{item?.title}</h3>
              <div className="banner-info">
                <small>{item?.createdAt?.toDate().toDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;