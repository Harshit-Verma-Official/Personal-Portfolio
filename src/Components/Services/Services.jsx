import React, { useEffect, useState } from "react";
import "./Services.css";
import firestore from "../../firebase";

function Services() {
  const [servicesTiles, setServicesTiles] = useState([]);

  useEffect(() => {
    // Fetch services tiles
    firestore
      .collection("SERVICES")
      .orderBy("index", "asc")
      .get()
      .then((snapshot) => {
        const tempServicesTiles = [];
        snapshot.docs.forEach((tile) => tempServicesTiles.push(tile.data()));
        setServicesTiles(tempServicesTiles);
      });
  }, []);

  return (
    <section className="colorlib-services" data-section="services">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div
            className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <span className="heading-meta">What I do?</span>
            <h2 className="colorlib-heading">Here are some of my expertise</h2>
          </div>
        </div>
        <div className="row row-pt-md">
          {servicesTiles?.map((tile, index) => (
            <div className="col-md-4 text-center">
              {/* Styling Hexazon : Psuedo Element */}
              <style>
                {`.services.color-${index} .icon {
                    background: ${tile?.color};
                  }
                  .services.color-${index} .icon:before {
                    border-color: transparent transparent ${tile?.color} transparent;
                  }
                  .services.color-${index} .icon:after {
                    border-color: ${tile?.color} transparent transparent transparent;
                  }`}
              </style>
              {/* Name Service Tile */}
              <div
                className={`services color-${index}`}
                style={{ borderBottom: `2px solid ${tile?.color}` }}
              >
                <span className="icon" style={{ background: tile?.color }}>
                  <i className={tile?.icon}></i>
                </span>
                <div className="desc">
                  <h3>{tile?.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: tile?.desc,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
