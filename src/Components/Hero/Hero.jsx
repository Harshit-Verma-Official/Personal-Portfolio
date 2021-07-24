import React, { useEffect, useState } from "react";
import "./Hero.css";
import firestore from "../../firebase";

function Hero() {
  const [carouselImages, setCarouselImages] = useState({});
  const [carouselText, setCarouselText] = useState({});
  const [resumeDownloadLink, setResumeDownloadLink] = useState("");

  useEffect(() => {
    // Fetch Carousel Images
    firestore
      .collection("CAROUSEL")
      .doc("CAROUSEL_IMAGES")
      .get()
      .then((snapshot) =>
        setCarouselImages({
          IMG_1: snapshot.data().IMG_1,
          IMG_2: snapshot.data().IMG_2,
        })
      )
      .catch((error) => console.error(error.message));

    // Fetch Carousel Text
    firestore
      .collection("CAROUSEL")
      .doc("HERO_TEXT")
      .get()
      .then((snapshot) =>
        setCarouselText({
          TXT_1: snapshot.data().TXT_1,
          TXT_2: snapshot.data().TXT_2,
        })
      )
      .catch((error) => console.error(new Error(error.message)));

    // Fetch CV Download Link
    firestore
      .collection("PORTFOLIO")
      .doc("DOWNLOAD_LINK")
      .get()
      .then((snapshot) => setResumeDownloadLink(snapshot.data().link))
      .catch((error) => console.error(new Error(error.message)));
  }, []);

  return (
    <section id="colorlib-hero" className="js-fullheight" data-section="home">
      <div className="flexslider js-fullheight">
        <ul className="slides">
          <li style={{ backgroundImage: `url("${carouselImages?.IMG_1}")` }}>
            <div className="overlay"></div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-xs-12 js-fullheight slider-text">
                  <div className="slider-text-inner js-fullheight">
                    <div
                      className="desc"
                      dangerouslySetInnerHTML={{
                        __html: carouselText?.TXT_1,
                      }}
                    />
                    <p>
                      <a
                        class="btn btn-primary btn-learn"
                        onClick={(e) =>
                          window.open(resumeDownloadLink, "_blank")
                        }
                      >
                        Download CV <i class="icon-download4"></i>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li style={{ backgroundImage: `url("${carouselImages?.IMG_2}")` }}>
            <div className="overlay"></div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-xs-12 js-fullheight slider-text">
                  <div className="slider-text-inner">
                    <div
                      className="desc"
                      dangerouslySetInnerHTML={{
                        __html: carouselText?.TXT_2,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
