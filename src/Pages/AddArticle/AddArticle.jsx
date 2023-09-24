import React, {useState} from 'react'
import "./AddArticle.css"
import { storage, db, auth } from '../../Config/FirebaseConfig'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { v4 } from 'uuid'
import { CollectionReference, addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AddArticle() {

    const categories = ["Health", "Food", "Travel", "Technology"]

    const navigate = useNavigate()
    const [user] = useAuthState(auth) 

    const [formData, setFormData] = useState({
        title:"",
        summary:"",
        paragragOne:"",
        paragragTwo:"",
        paragragThree:"",
        category:"",
        image:"",
    })

    const handleSubmit = e => {
        e.preventDefault()
        // create a reference for the image
        const imageRef = (storage, `images/${formData.image.name + v4()}`)
        // now upload the image from bucket
        uploadBytes(imageRef, formData.image)
        .then((res) => {
            // console.log(res.ref)
            getDownloadURL(res.ref)
            .then((url) => {
                // now we have all data and image url ready
                // create article reference
                const articleRef = collection(db, "Articles")
                // us addDoc to add the article
                addDoc(articleRef, {
                    title: formData.title,
                    summary:  formData.title,
                    paragragOne: formData.title.paragragOne,
                    paragragTwo:  formData.title.paragragTwo,
                    paragragThree:formData.title.paragragThree,
                    category: formData.title.category,
                    imageUrl: url,
                    createdBy: user?.displayName,
                    userId: user?.uid,
                    createdAt: Timestamp.now().toDate()
                })
                .catch(err => console.log(err))
            
                
            })
            .then(res => {
                // give feedback to the user that they successfully added a article
                toast("Article saved successfully", {
                    type: "success",
                    autoClose: 150,
                })
                // pause before navigating the user to homepage
                setTimeout(()=>{navigate("/")},2000)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }


  return (
    <div className="add-article-container">
    <form className="add-article-form"  onSubmit={handleSubmit}>
         <h2>Create Article</h2>
         <div className="input-group">
             <label htmlFor="title">Title</label>
             <input type="text" id="title" 
             placeholder="Maximum 100 characters" 
             maxLength="100"
             onChange={(e) => setFormData({...formData, title: e.target.value})}
             />
         </div> 
         <div className="input-group">        
             <label htmlFor="summary">Summary</label>
             <textarea id="summary"
             placeholder="Maximum 120 characters" 
             maxLength="120"
             onChange={(e) => setFormData({...formData, summary: e.target.value})}
             />
         </div> 
         <div className="input-group">
             <label htmlFor="paragraphOne">Paragraph One</label>
             <textarea id="paragraphOne" 
             placeholder="Maximum 650 characters" 
             maxLength="650"
             onChange={(e) => setFormData({...formData, paragragOne: e.target.value})}
             />
         </div>
         <div className="input-group">
             <label htmlFor="paragraphTwo">Paragraph Two</label>
             <textarea id="paragraphTwo"
             placeholder="Maximum 650 characters" 
             maxLength="650"
             onChange={(e) => setFormData({...formData, paragragTwo: e.target.value})}
             />
         </div>
         <div className="input-group">
             <label htmlFor="paragraphThree">Paragraph Three</label>
             <textarea id="paragraphThree" 
             placeholder="Maximum 650 characters" 
             maxLength="650"
             onChange={(e) => setFormData({...formData, paragragThree: e.target.value})}
             />
         </div>
         <div className="input-group">
             <label htmlFor="category">Category</label>
             <select id="category" 
             onChange={(e) => setFormData({...formData, category: e.target.value})}
             >
                 <option value="">Select</option>
                 {
                    categories.map(item => 
                    <option value={item} key={index}>{item}</option>)
                 }
             </select>
         </div>
         <div className="input-group">
             <label>Upload Image</label>
             <input type="file" id="image" accept="image/*" 
             onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
             />
         </div>
         <button type="submit">Submit</button>
     </form>
 </div>
  )
}

export default AddArticle


// npm install --save react-toastify