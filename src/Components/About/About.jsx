import React, { useEffect, useState } from "react";
import "./About.css";
import firestore from "../../firebase";

function About() {
  const [aboutText, setAboutText] = useState("");
  const [aboutTiles, setAboutTiles] = useState([]);
  const [bannerText, setBannerText] = useState("");

  useEffect(() => {
    // Fetch about text
    firestore
      .collection("ABOUT")
      .doc("ABOUT_TEXT")
      .get()
      .then((snapshot) => setAboutText(snapshot.data().TEXT))
      .catch((error) => console.error(error.message));

    // Fetch about tiles
    firestore
      .collection("ABOUT")
      .doc("ABOUT_TILES")
      .collection("TILES")
      .orderBy("index", "asc")
      .get()
      .then((snapshot) => {
        const tempTiles = [];
        snapshot.docs.forEach((tile) => {
          tempTiles.push(tile.data());
        });
        setAboutTiles(tempTiles);
      })
      .catch((error) => console.error(error.message));

    // Fetch banner text
    firestore
      .collection("ABOUT")
      .doc("BANNER")
      .get()
      .then((snapshot) => setBannerText(snapshot.data().BANNER_TXT))
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <section className="colorlib-about" data-section="about">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div className="col-md-12">
            <div
              className="row row-bottom-padded-sm animate-box"
              data-animate-effect="fadeInLeft"
            >
              <div className="col-md-12">
                <div className="about-desc" style={{ minHeight: "400px" }}>
                  <span className="heading-meta">About Us</span>
                  <h2 className="colorlib-heading">Who Am I?</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: aboutText,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ minHeight: "160px" }}>
              {aboutTiles?.map((tile) => (
                <div className="col-md-3" data-animate-effect="fadeInLeft">
                  <div
                    className="services color-1"
                    style={{
                      height: "160px",
                      borderBottom: `2px solid ${tile?.color}`,
                    }}
                  >
                    <span className="icon2">
                      <i
                        className={tile?.icon}
                        style={{ color: `${tile?.color}` }}
                      ></i>
                    </span>
                    <h3
                      style={{ lineHeight: "24px" }}
                      dangerouslySetInnerHTML={{
                        __html: tile?.title,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div
                className="col-md-12 animate-box"
                data-animate-effect="fadeInLeft"
              >
                <div className="hire" style={{ minHeight: "180px" }}>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: bannerText,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
