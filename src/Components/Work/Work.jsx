import React, { useEffect, useState } from "react";
import "./Work.css";
import firestore from "../../firebase";
import Arrow from "../../Assets/arrow.svg";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { paginate } from "../../Utils/paginate";

function Work({ setTempProp }) {
  const pageSize = 4;

  // States
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pickedFilter, setPickedFilter] = useState("all");
  const [filterMenuActive, setFilterMenuActive] = useState(false);
  const [pickedFilterDropdown, setPickedFilterDropdown] = useState("NEWEST");
  const [filterResult, setFilterResult] = useState(null);
  const [githubLink, setGithubLink] = useState("");
  const [pageCounter, setPageCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Effects
  useEffect(() => {
    // Fetch Categories
    firestore
      .collection("PROJECTS")
      .doc("CATEGORIES")
      .collection("CATEGORIES_LIST")
      .orderBy("index", "asc")
      .get()
      .then((snapshots) =>
        setCategories([...snapshots.docs.map((category) => category.data())])
      )
      .catch((error) => console.error(new Error(error.message)));

    // Fetch projects
    firestore
      .collection("PROJECTS")
      .doc("PROJECTS")
      .collection("PROJECTS_LIST")
      .orderBy("index", "desc")
      .get()
      .then((snapshots) => {
        setProjects([...snapshots.docs.map((project) => project.data())]);
        setFilterResult([...snapshots.docs.map((project) => project.data())]);
        setTempProp(" ");
      })
      .catch((error) => console.error(new Error(error.message)));

    // Fetch github link
    firestore
      .collection("PROJECTS")
      .doc("GITHUB")
      .get()
      .then((snapshot) => setGithubLink(snapshot.data().link))
      .catch((error) => console.error(new Error(error.message)));
  }, []);

  useEffect(() => {
    let itemsCount = filterResult?.length;
    const pageCount = Math.ceil(itemsCount / pageSize);
    setPageCounter(pageCount);
  }, [filterResult]);

  const handlePageChange = (event, pageNo) => {
    setCurrentPage(pageNo);
  };

  const filterGallery = (target) => {
    let projectsArr = [...projects];
    let result;

    if (target !== "all") {
      result = projectsArr?.filter((project) =>
        project?.tags?.includes(target)
      );
    } else {
      result = projectsArr;
    }

    setPickedFilter(target);
    setFilterResult(result);
    setPickedFilterDropdown("NEWEST");
    setCurrentPage(1);
  };

  // FILTER DROP DOWN HOVER MENU FUNCTION
  const filterMenuHover = (event) => {
    if (event) {
      setFilterMenuActive(true);
    } else {
      setFilterMenuActive(false);
    }
  };

  function objToDate(obj) {
    let result = new Date(0);
    result.setSeconds(obj.seconds);
    result.setMilliseconds(obj.nanoseconds / 1000000);
    return result;
  }

  // FILTER DROP DOWN HANDLER
  const filterDropDownHandler = (filter) => {
    setPickedFilterDropdown(filter);
    setFilterMenuActive(false);

    let projectsArr = [...filterResult];
    let result;

    if (filter === "OLDEST") {
      result = projectsArr.sort((a, b) => a.index - b.index);
    } else if (filter === "NEWEST") {
      result = projectsArr.sort((a, b) => a.index - b.index).reverse();
    }

    setFilterResult(result);
  };

  // PORTFOLIO FILTER DROPDOWN MENY RENDER
  let filterDroppDown = null;
  if (filterMenuActive) {
    filterDroppDown = (
      <div className="portfolio__filter-menu shadow">
        <p className="font12" onClick={() => filterDropDownHandler("NEWEST")}>
          NEWEST
        </p>
        <p className="font12" onClick={() => filterDropDownHandler("OLDEST")}>
          OLDEST
        </p>
      </div>
    );
  }

  return (
    <section className="colorlib-work" data-section="work">
      <div className="colorlib-narrow-content">
        <div className="row">
          <div
            className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <span className="heading-meta">My Work</span>
            <h2 className="colorlib-heading animate-box">Recent Work</h2>
          </div>
        </div>
        <div
          className="row row-bottom-padded-sm animate-box"
          data-animate-effect="fadeInLeft"
        >
          <div className="col-md-12">
            <p className="work-menu">
              <span>
                <a href="#" className="active">
                  Projects
                </a>
              </span>
            </p>
          </div>
        </div>

        {/* Categories */}
        <div id="portfolio">
          <div className="wrapper">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                <div className="portfolio__nav">
                  <div className="row d-flex">
                    {categories?.map((category) => (
                      <div
                        className={
                          pickedFilter === category?.title.toLowerCase()
                            ? "portfolio__nav-active font12 col-md-2 col-sm-3 col-xs-3 text-center"
                            : "font12 col-md-2 col-sm-3 col-xs-3 text-center"
                        }
                        onClick={() =>
                          filterGallery(category?.title.toLowerCase())
                        }
                      >
                        {category?.title.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                <div
                  className="portfolio__filter"
                  onMouseEnter={() => filterMenuHover(true)}
                  onMouseLeave={() => filterMenuHover(false)}
                >
                  <p className="font12">{pickedFilterDropdown} FIRST</p>
                  <img src={Arrow} alt="arrow" />
                  {filterDroppDown}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row centered">
          {/* Project Tiles */}

          {typeof filterResult !== "undefined"
            ? paginate(filterResult, currentPage, pageSize)?.map(
                (project, index) => (
                  <div className="col-md-6">
                    <div class="card">
                      <img src={project?.thumbnail} />
                      <div class="info">
                        <h1>{project?.title}</h1>
                        <p>{project?.description}</p>
                        <button
                          onClick={(e) => window.open(project?.link, "_blank")}
                          style={{ textTransform: "uppercase" }}
                        >
                          take a peek
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            : ""}
        </div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination
            count={pageCounter}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
        <div className="row">
          <div className="col-md-12">
            <div id="container">
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span
                  className="button-text"
                  onClick={(e) => window.open(githubLink, "_blank")}
                >
                  Load more on GitHub
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;
