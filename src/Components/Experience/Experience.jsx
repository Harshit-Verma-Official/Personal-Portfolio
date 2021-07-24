import React, { useEffect, useState } from "react";
import "./Experience.css";
import firestore from "../../firebase";

function Experience() {
  const [experienceSet, setExperienceSet] = useState([]);

  useEffect(() => {
    firestore
      .collection("EXPERIENCE")
      .orderBy("index", "asc")
      .get()
      .then((snapshots) =>
        setExperienceSet([...snapshots.docs.map((exp) => exp.data())])
      )
      .catch((error) => console.error(new Error(error.message)));
  }, []);

  return (
    <section className="colorlib-experience" data-section="experience">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div
            className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <span className="heading-meta">Experience</span>
            <h2 className="colorlib-heading animate-box">Work Experience</h2>
          </div>
        </div>
        <div className="row" style={{ minHeight: "1000px" }}>
          <div className="col-md-12">
            <div className="timeline-centered">
              {/* Experience Render */}
              {experienceSet?.map((exp) => (
                <article
                  className="timeline-entry"
                  data-animate-effect="fadeInLeft"
                >
                  <div className="timeline-entry-inner">
                    <div
                      className="timeline-icon color-1"
                      style={{ background: exp?.color }}
                    >
                      <i className={exp?.icon}></i>
                    </div>

                    <div className="timeline-label">
                      <h2>
                        {exp?.title}
                        <span style={{ marginLeft: "8px" }}>
                          {exp?.duration}
                        </span>
                      </h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: exp?.description,
                        }}
                      />
                    </div>
                  </div>
                </article>
              ))}

              <article
                className="timeline-entry begin animate-box"
                data-animate-effect="fadeInBottom"
              >
                <div className="timeline-entry-inner">
                  <div className="timeline-icon color-none"></div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
