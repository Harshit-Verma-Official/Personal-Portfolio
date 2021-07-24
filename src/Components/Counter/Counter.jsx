import React, { useEffect, useState } from "react";
import "./Counter.css";
import firestore from "../../firebase";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Ticker from "../Ticker/Ticker";

function Counter() {
  const [counterVars, setCounterVars] = useState([]);
  const [didViewCountUp, setDidViewCountUp] = useState(false);

  useEffect(() => {
    firestore
      .collection("COUNTER")
      .orderBy("index", "asc")
      .get()
      .then((snapshots) =>
        setCounterVars(snapshots.docs.map((counter) => counter.data()))
      )
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <div
      id="colorlib-counter"
      className="colorlib-counters"
      style={{ backgroundImage: "url(images/cover_bg_1.jpg)" }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay"></div>
      <div className="colorlib-narrow-content">
        <div className="row"></div>
        <div className="row">
          {counterVars?.map((counter) => (
            <div className="col-md-3 text-center">
              <Ticker
                className="colorlib-counter js-counter"
                end={`${counter?.count}`}
              />
              <span className="colorlib-counter-label">{counter?.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Counter;
