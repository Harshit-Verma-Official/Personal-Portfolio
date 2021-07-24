import React, { useEffect, useState } from "react";
import "./Education.css";
import firestore from "../../firebase";

function Education() {
  const [educationSet, setEducationSet] = useState([]);

  useEffect(() => {
    firestore
      .collection("EDUCATION")
      .orderBy("index", "asc")
      .get()
      .then((snapshots) =>
        setEducationSet([...snapshots.docs.map((edu) => edu.data())])
      )
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <section className="colorlib-education" data-section="education">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div
            className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <span className="heading-meta">Education</span>
            <h2 className="colorlib-heading animate-box">Education</h2>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <div className="fancy-collapse-panel">
              <div
                className="panel-group"
                id="accordion"
                role="tablist"
                aria-multiselectable="true"
              >
                {/* Education Render */}
                {educationSet?.map((education, index) => (
                  <div className="panel panel-default">
                    <div
                      className="panel-heading"
                      role="tab"
                      id={`heading${index}`}
                    >
                      <h4 className="panel-title">
                        <a
                          className={index !== 0 ? "collapsed" : ""}
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          {education?.title}
                        </a>
                      </h4>
                    </div>
                    <div
                      id={`collapse${index}`}
                      className={`panel-collapse collapse ${
                        index === 0 ? "in" : ""
                      }`}
                      role="tabpanel"
                      aria-labelledby={`heading${index}`}
                    >
                      <div className="panel-body">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: education?.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
