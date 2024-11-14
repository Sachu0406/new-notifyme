import React from "react";
import classes from "../../assets/Modules/Footer.module.scss";
import { TransFormString } from "./StaticText";
//import useAllDataStore from "../APIStore/Store";

const Footer = () => {
  // const { getVisitorsCount, visitorsCount } = useAllDataStore();
  // useEffect(() => {
  //   getVisitorsCount();
  // }, []);
  return (
    <footer className={`container-fluid ${classes.footer}`}>
      <div className="row h-100">
        <div className="col-md-4 ">
          <div className={`card m-3 ${classes.card}`}>
            <div className="card-body">
              <h4 className="card-title">{TransFormString.appName}</h4>
              <ol className="list-unstyled">
                <li>Please help us by providing some more content.</li>
                <li>
                  Please let us know if we missed or need to add more websites.
                </li>
                <li>
                  The information provided in this website may vary from
                  original one, please visit official website for further
                  information.
                </li>
                <li>
                  Please go through{" "}
                  <a href="javascript:void(0)">Terms & conditions</a>.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-start">
          <div className={`card m-3 ${classes.card}`}>
            <div className="card-body">
              <h4 className="card-title">
                {TransFormString.supportAndSuggestions}
              </h4>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-start">
                  <i className="bi bi-envelope-at me-2 text-info fs-4"></i>
                  <span>helpnotifyme@gmail.com</span>
                </li>
                <li className="d-flex justify-content-start">
                  <i className="bi bi-envelope-at me-2 text-info fs-4"></i>
                  <span>supportnotifyme@gmail.com</span>
                </li>
                <li className="d-flex justify-content-start">
                  <i className="bi bi-envelope-at me-2 text-info fs-4"></i>
                  <span>suggestnotifyme@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-start">
          <div className={`card m-3 ${classes.card}`}>
            <div className="card-body">
              <h4 className="card-title">{TransFormString.followUsOn}</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.facebook.com/login/" target="/">
                    <i className="bi bi-facebook me-2 text-primary fs-4"></i>
                    FaceBook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/accounts/login/"
                    target="/"
                  >
                    <i className="bi bi-instagram me-2 text-danger fs-4"></i>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://x.com/i/flow/login" target="/">
                    <i className="bi bi-twitter me-2 text-primary fs-4"></i>
                    Twitter &nbsp; &nbsp;
                  </a>
                </li>
                {/* <li>{Math.ceil(+visitorsCount / 2)}</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-end mb-3">
          <div className={`${classes.footer__copyRight}`}>
            &copy; {new Date().getFullYear()} {TransFormString.copyRight}
            {/* :
            {"  "}
            <a href={"javascript:void(0)"}>{TransFormString.webSiteURL}</a> */}
          </div>
          <div>
            &nbsp; | &nbsp;
            <a href="javascript:void(0)">{TransFormString.termsAndCondition}</a>
          </div>
          <div>
            &nbsp; | &nbsp;
            <a href="javascript:void(0)">{TransFormString.privacyAndPolicy}</a>
          </div>
          <div>
            &nbsp; | &nbsp;
            <a href="javascript:void(0)">{TransFormString.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
