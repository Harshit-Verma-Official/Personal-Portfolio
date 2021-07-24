import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import ProgressButton from "react-progress-button";
import firestore from "../../firebase";
import firebase from "firebase";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [buttonState, setButtonState] = useState("");
  const [validationError, setValidationError] = useState("");
  const [hideError, setHideError] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    firestore
      .collection("CONTACT")
      .orderBy("index", "asc")
      .get()
      .then((snapshot) =>
        setContacts([...snapshot.docs.map((contact) => contact.data())])
      )
      .catch((error) => console.error(new Error(error.message)));
  }, []);

  const handleOnChange = (event) => {
    let tempObj = {};
    tempObj[event.target.name] = event.target.value;
    setMessage({ ...message, ...tempObj });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setButtonState("loading");
    setValidationError("");
    setHideError(false);
    // make asynchronous call

    if (message.name && message.email && message.subject && message.message) {
      if (typeof message?.email !== "undefined") {
        let lastAtPos = message?.email.lastIndexOf("@");
        let lastDotPos = message?.email.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            message?.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            message?.email.length - lastDotPos > 2
          )
        ) {
          setValidationError("Email is not valid");
          window.setTimeout(() => setButtonState("error"), 1000);
          return;
        }
      }

      firestore
        .collection("MESSAGES")
        .add({
          ...message,
          uploadedOn: firebase.firestore.FieldValue.serverTimestamp(),
          read: false,
        })
        .then((snapshot) => {
          setButtonState("success");
          window.setTimeout(() => setHideError(true), 3000);
          setValidationError("Gotcha! I'll get back to you shortly.");
        })
        .catch((error) => {
          console.error(new Error(error.message));
          window.setTimeout(() => setButtonState("error"), 1000);
        });
    } else {
      setValidationError("Enter all fields.");
      window.setTimeout(() => setHideError(true), 3000);
      window.setTimeout(() => setButtonState("error"), 1000);
    }
  };

  return (
    <section className="colorlib-contact" data-section="contact">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div
            className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <span className="heading-meta">Get in Touch</span>
            <h2 className="colorlib-heading">Contact</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 contacts-div">
            {/* Contacts */}
            {contacts.map((contact) => (
              <div
                className="colorlib-feature colorlib-feature-sm contact-link"
                data-animate-effect="fadeInLeft"
                onClick={(e) => window.open(contact.link, "_blank")}
              >
                <div className="colorlib-icon">
                  <i className={contact.icon}></i>
                </div>
                <div className="colorlib-text">
                  <p>
                    <a style={{ cursor: "pointer" }} className="contact-title">
                      {contact.title}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="col-md-7 col-md-push-1">
            <div className="row">
              <div
                className="col-md-10 col-md-offset-1 col-md-pull-1 animate-box"
                data-animate-effect="fadeInRight"
              >
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      ref={nameRef}
                      name="name"
                      placeholder="Name"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      ref={emailRef}
                      name="email"
                      placeholder="Email"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      ref={subjectRef}
                      name="subject"
                      placeholder="Subject"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      ref={messageRef}
                      cols="30"
                      rows="7"
                      className="form-control"
                      placeholder="Message"
                      onChange={handleOnChange}
                    ></textarea>
                  </div>
                  {hideError ? (
                    <style>
                      {`    .error-string  {
                                visibility: hidden;
                            }
                            .success-message  {
                                visibility: hidden;
                            }`}
                    </style>
                  ) : (
                    ""
                  )}
                  <p
                    className={
                      validationError ===
                      "Gotcha! I'll get back to you shortly."
                        ? "success-message"
                        : "error-string"
                    }
                  >
                    {validationError}
                  </p>
                  <ProgressButton onClick={handleClick} state={buttonState}>
                    SEND MESSAGE
                  </ProgressButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
