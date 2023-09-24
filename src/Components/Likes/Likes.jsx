import React, { useState, useEffect } from "react";
import "./Likes.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { auth, db } from '../../Config/FirebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
} from "firebase/firestore";

const Likes = ({ articleId }) => {
    const [user] = useAuthState(auth);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    //   need to know if this user has liked this article to display correct icon
    useEffect(() => {
        // did this user like this article?
        const likesRef = collection(db, "Likes");
        // should be logged in
        if (user) {
            // make a query to see if liked
            const q = query(
                likesRef,
                where("articleId", "==", articleId),
                where("userId", "==", user?.uid)
            );

            //   look for a matching document
            getDocs(q, likesRef)
                .then((res) => {
                    if (res.size > 0) {
                        setIsLiked(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {
        // now find out like count
        // make a query to count likes
        const likesRef = collection(db, "Likes");

        const q2 = query(likesRef, where("articleId", "==", articleId));

        // look for matching documents
        getDocs(q2, likesRef)
            .then((res) => {
                setLikeCount(res.size);
            })
            .catch((err) => console.log(err));
    }, [isLiked]);

    //   need to add a like for this user to be able to like and unlike this article
    // we need another collection that stores the userId and the articleId
    const handleLikes = (e) => {
        if (user) {
            // create a reference to likes collection
            // will create the collection if it doesn't exist
            const likesRef = collection(db, "Likes");
            // add a document with this articleId and userId
            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId,
            })
                .then((res) => {
                    // We want to show the full heart to the user
                    setIsLiked(true);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleUnlikes = (e) => {
        if (user) {
            // need to find document with this articleId and userId to get its document id
            const likesRef = collection(db, "Likes");

            // setup a query to find id of the record to delete
            const q = query(
                likesRef,
                where("articleId", "==", articleId),
                where("userId", "==", user?.uid)
            );

            //   get a match
            getDocs(q, likesRef)
                .then((res) => {
                    console.log(res.docs[0].id);
                    const likesId = res.docs[0].id;
                    // now we finally delete this doc from likes collection
                    deleteDoc(doc(db, "Likes", likesId))
                        .then((res) => {
                            setIsLiked(false);
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            {isLiked ? (
                <FaHeart onClick={handleUnlikes} />
            ) : (
                <FaRegHeart onClick={handleLikes} />
            )}
            <span> {likeCount}</span>
        </div>
    );
};

export default Likes;