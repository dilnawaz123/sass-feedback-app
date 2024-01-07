import React from "react";
import "./style.css";

export default function Home() {
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
                    <div className="div-2" />
                  </div>
                  <div className="group-2">
                    <div className="text-wrapper">Feedback Title</div>
                    <p className="p">Add a short, descriptive headline</p>
                  </div>
                </div>
                <div className="group-copy">
                  <div className="div-wrapper">
                    <div className="rectangle" />
                  </div>
                  <div className="group-3">
                    <div className="text-wrapper">Feedback Detail</div>
                    <p className="p">Include any specific comments on what should be improved, added, etc.</p>
                  </div>
                </div>
                <div className="overlap-group-wrapper">
                  <div className="overlap-group">
                    <div className="text-wrapper-2">Add Feedback</div>
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
                      <div className="text-wrapper-3">Feature</div>
                      <img className="path" alt="Path" src="path-2.svg" />
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
