import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import Counter from "./Components/Counter/Counter";
import Skills from "./Components/Skills/Skills";
import Education from "./Components/Education/Education";
import Experience from "./Components/Experience/Experience";
import Work from "./Components/Work/Work";
import Contact from "./Components/Contact/Contact";
import firestore from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [pageTitle, setPageTitle] = useState("Harshit Verma Portfolio");
  const [faviconLink, setFaviconLink] = useState("");

  const getFaviconEl = () => {
    return document.getElementById("favicon");
  };

  const setTitle = (title) => {
    // Page Title
    document.title = title;
  };

  const setFavicon = (link) => {
    const favicon = getFaviconEl();
    if (link) favicon.href = link;
  };

  useEffect(() => {
    firestore
      .collection("METADATA")
      .doc("METADATA")
      .get()
      .then((snapshot) => {
        setPageTitle(snapshot.data()?.title);
        setFaviconLink(snapshot.data()?.favicon);
      })
      .catch((error) => console.error(error.message));
  }, []);

  // Calls
  setTitle(pageTitle);
  setFavicon(faviconLink);

  return (
    <div className="app">
      <div className="colorlib-page">
        <div className="container-wrap">
          <Sidebar />

          <div id="colorlib-main">
            <Hero />
            <About />
            <Services />
            <Counter />
            <Skills />
            <Education />
            <Experience />
            <Work />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
