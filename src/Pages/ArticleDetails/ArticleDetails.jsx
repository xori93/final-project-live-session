import React, { useEffect, useState } from "react";
import "./ArticleDetails.css";
import { useParams } from "react-router-dom";
import { db } from "../../Config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Likes from "../../Components/Likes/Likes";
import Comments from "../../Components/Comments/Comments";



const ArticleDetails = () => {
  const { articleId } = useParams();

  const [article, setArticle] = useState({});

  useEffect(() => {
    // setup a reference to the document with the id
    const articleRef = doc(db, "Articles", articleId);

    getDoc(articleRef)
      .then((res) => {
        setArticle(res.data());
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="details-container">
      <h1>{article?.title}</h1>
      <h2>{article?.summary}</h2>
      <div className="details-info-container">
        <p>Category: {article?.category}</p>
        <p>
          <span className="article-span">Author: </span>
          {article?.createdBy?.toUpperCase()}
        </p>
        <p>
          <span className="article-span published">Published: </span>
          {article?.createdAt?.toDate()?.toDateString()}
        </p>
        <Likes articleId={articleId} />
      </div>
      <div className="details-content">
        <img src={article?.imageUrl} className="details-img" />
        <p className="article-description">{article?.paragraghOne}</p>
        <p className="article-description">{article?.paragraghTwo}</p>
        <p className="article-description">{article?.paragraghThree}</p>
      </div>
      <Comments articleId={articleId}/>
    </div>
  );
};

export default ArticleDetails;