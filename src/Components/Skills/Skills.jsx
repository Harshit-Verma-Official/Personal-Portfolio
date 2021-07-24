import React, { useEffect, useState } from "react";
import "./Skills.css";
import firestore from "../../firebase";

function Skills() {
  const [skillset, setSkillset] = useState([]);

  useEffect(() => {
    firestore
      .collection("SKILLS")
      .orderBy("index", "asc")
      .get()
      .then((snapshots) =>
        setSkillset([...snapshots.docs.map((skill) => skill.data())])
      )
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <section className="colorlib-skills" data-section="skills">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div
            className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <span className="heading-meta">My Specialty</span>
            <h2 className="colorlib-heading animate-box">My Skills</h2>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <p>I am skilled in some technical areas which are follows</p>
          </div>

          {/* Skills Render */}
          {skillset?.map((skill, index) => (
            <div className="col-md-6" data-animate-effect="fadeInLeft">
              <style>
                {`.progress-bar.color-${index} {
                background: ${skill?.color};
              }
              .progress-bar.color-${index}:after {
                background: ${skill?.color};
              }
              .progress-bar.color-${index} span {
                color: ${skill?.color};
              }`}
              </style>
              <div className="progress-wrap">
                <h3>{skill?.title}</h3>
                <div className="progress">
                  <div
                    className={`progress-bar color-${index}`}
                    role="progressbar"
                    aria-valuenow={skill?.percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: `${skill?.percent}%`,
                      background: skill?.color,
                    }}
                  >
                    <span>{skill?.percent}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
