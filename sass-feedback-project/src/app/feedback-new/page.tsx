'use client'
import "./style.css";
import React, { useState } from 'react';



export default function Home() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('category1'); // Set a default category

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleDetailsChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDetails(e.target.value);
  };

  const handleCategoryChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCategory(e.target.value);
  };

  const handleAddFeedback = () => {
   
    console.log('Title:', title);
    console.log('Details:', details);
    console.log('Category:', category);

    fetch('http://localhost:3001/api/add/new/sassFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, details, category }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 1) {
          console.log(res);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <main className="">
      <div className="desktop-new-feedback">
      <div className="group-wrapper">
        <div className="group">
          <div className="overlap-wrapper">
            <div className="overlap">
              <div className="rectangle-copy" />
              <div className="div">
                <div className="rectangle-wrapper">
                  <input type="text" placeholder="Enter Title" value={title} onChange={handleTitleChange} />
                </div>
                <div className="group-2">
                  <div className="text-wrapper">Feedback Title</div>
                  <p className="p">Add a short, descriptive headline</p>
                </div>
              </div>
              <div className="group-copy">
                <div className="div-wrapper">
                  <input type="text" placeholder="Enter Details" value={details} onChange={handleDetailsChange} />
                </div>
                <div className="group-3">
                  <div className="text-wrapper">Feedback Detail</div>
                  <p className="p">Include any specific comments on what should be improved, added, etc.</p>
                </div>
              </div>
              <div className="overlap-group-wrapper">
                <div className="overlap-group">
                  <div className="text-wrapper-2" onClick={handleAddFeedback}>Add Feedback</div>
                </div>
              </div>
              <div className="group-copy-2">
                <div className="overlap-2">
                  <div className="text-wrapper-2">Cancel</div>
                </div>
              </div>
              <div className="group-copy-3">
                <div className="group-4">
                  <div className="div-2">
                  
                  <select value={category} onChange={handleCategoryChange}>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                  </select>
                  </div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper">Category</div>
                  <p className="p">Choose a category for your feedback</p>
                </div>
              </div>
              <div className="text-wrapper-4">Create New Feedback</div>
              <div className="group-6">
                <div className="img-wrapper">
                  <img className="img" alt="Img" src="image.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="group-7">
            <div className="text-wrapper-5">Go Back</div>
            <img className="path-2" alt="Path" src="path-2-2.svg" />
          </div>
        </div>
      </div>
    </div>
    </main>
  )
}

