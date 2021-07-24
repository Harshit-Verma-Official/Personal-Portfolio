import { Avatar, IconButton } from "@material-ui/core";
import { Facebook, GitHub, Instagram, LinkedIn } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import firestore from "../../firebase";
import "./Sidebar.css";

function Sidebar() {
  const [profilePic, setProfilePic] = useState("");
  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    firestore
      .collection("SIDEBAR")
      .doc("SIDEBAR_AVATAR")
      .get()
      .then((snapshot) => setProfilePic(snapshot.data().link))
      .catch((error) => console.error(new Error(error.message)));

    firestore
      .collection("SIDEBAR")
      .doc("SOCIAL_LINKS")
      .collection("LIST")
      .orderBy("index", "asc")
      .get()
      .then((snapshots) =>
        setSocialLinks(snapshots.docs.map((snapshot) => snapshot.data().link))
      )
      .catch((error) => console.error(new Error(error.message)));
  }, []);

  return (
    <div className="sidebar">
      <a
        href="#"
        className="js-colorlib-nav-toggle colorlib-nav-toggle"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="false"
        aria-controls="navbar"
      >
        <i></i>
      </a>
      <aside
        id="colorlib-aside"
        role="complementary"
        className="border js-fullheight"
      >
        <div className="text-center">
          <Avatar src={profilePic} className="author-img" />
          <h1 id="colorlib-logo">
            <a href="index.html">Harshit Verma</a>
          </h1>
          <span className="position">
            <a href="#">Programmer & UI/UX/Designer</a> <br /> in India
          </span>
        </div>
        <nav id="colorlib-main-menu" role="navigation" className="navbar">
          <div id="navbar" className="collapse">
            <ul>
              <li className="active">
                <a href="#" data-nav-section="home">
                  Home
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="about">
                  About
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="services">
                  Services
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="skills">
                  Skills
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="education">
                  Education
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="experience">
                  Experience
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="work">
                  Work
                </a>
              </li>
              <li>
                <a href="#" data-nav-section="contact">
                  Contact
                </a>
              </li>
            </ul>
            <div className="colorlib-footer">
              <ul>
                <li>
                  <IconButton
                    onClick={(e) =>
                      window.open(
                        typeof socialLinks !== "undefined"
                          ? socialLinks[0]
                          : "",
                        "_blank"
                      )
                    }
                    id="facebook__btn"
                  >
                    <Facebook fontSize="large" />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    onClick={(e) =>
                      window.open(
                        typeof socialLinks !== "undefined"
                          ? socialLinks[1]
                          : "",
                        "_blank"
                      )
                    }
                    id="instagram__btn"
                  >
                    <Instagram fontSize="large" />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    onClick={(e) =>
                      window.open(
                        typeof socialLinks !== "undefined"
                          ? socialLinks[2]
                          : "",
                        "_blank"
                      )
                    }
                    id="linkedin__btn"
                  >
                    <LinkedIn fontSize="large" />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    onClick={(e) =>
                      window.open(
                        typeof socialLinks !== "undefined"
                          ? socialLinks[3]
                          : "",
                        "_blank"
                      )
                    }
                    id="github__btn"
                  >
                    <GitHub fontSize="large" />
                  </IconButton>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
