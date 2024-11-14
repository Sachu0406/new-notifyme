import React, { useCallback, useEffect, useState } from "react";
import classes from "../../assets/Modules/HomePage.module.scss";
import AutoScrollList from "../Shared/AutoScrollList";
import { TransFormString } from "../Shared/StaticText";
import { iState } from "../Shared/ObjectModals";
import useAllDataStore from "../APIStore/Store";
import { useSearchParams } from "react-router-dom";
import SelectStateModal from "./SelectStateModal";
const Home = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") || 0;
  const [showDialogue] = useState<boolean>(state ? false : true);
  const { stateList, getAllStates } = useAllDataStore();
  const [currentState, setCurrentState] = useState<iState>({
    districts: [],
    _id: "",
    shortName: "",
    stateName: "",
    stateId: 0,
  });
  // useEffect(() => {
  //   if (stateList?.length === 0 && +state !== 0) {
  //     getAllStates();
  //   }
  // }, []);
  const getStates = useCallback(() => {
    if (stateList?.length === 0 && +state !== 0) {
      getAllStates();
    }
  }, [stateList?.length === 0]);

  useEffect(() => {
    if (stateList?.length > 0 && +state !== 0) {
      const matchedState: any = stateList?.find(
        (obj) => obj.stateId === +state
      );
      setCurrentState(matchedState);
    }
    getStates();
  }, [stateList, state]);

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    // "Item 6",
    // "Item 7",
    // "Item 8",
    // "Item 9",
    // "Item 10",
    // "Item 11",
    // "Item 12",
  ];

  return (
    <>
      <div className="container-fluid mt-3" key={stateList.length}>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          <div className="col-md-4">
            <div className="card h-100 shadow bg-light">
              <div className="card-body">
                <h5 className="card-title">{TransFormString.quickLinksJobs}</h5>
                <p className="card-text">
                  <AutoScrollList items={items} />
                </p>
              </div>
              {/* <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div> */}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow bg-light d-flex justify-content-between">
              <div className="card-body">
                <h5 className="card-title">{TransFormString.notifications}</h5>
                <p className="card-text">
                  <div className="card">
                    <div className={`card-body ${classes.homepage}`}>
                      <h5 className="card-title">{TransFormString.jobs}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {TransFormString.subTitleJobs}
                      </h6>
                      <p className="card-text">
                        {TransFormString.homeCardText}
                      </p>
                      <a
                        href={`/jobs?state=${currentState.stateId}`}
                        className="card-link"
                      >
                        {currentState.stateName} State
                      </a>
                      <a href={`/jobs?state=0`} className="card-link">
                        {TransFormString.allOverIndia}
                      </a>
                    </div>
                  </div>
                </p>
                <p>
                  <div className="card">
                    <div className={`card-body ${classes.homepage}`}>
                      <h5 className="card-title">
                        {TransFormString.admissions}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {TransFormString.subTitleAdmissions}
                      </h6>
                      <p className="card-text">
                        {TransFormString.homeCardText}
                      </p>
                      <a
                        href={`/admissions?state=${currentState.stateId}`}
                        className="card-link"
                      >
                        {currentState.stateName} State
                      </a>
                      <a href={"/admissions?state=0"} className="card-link">
                        {TransFormString.allOverIndia}
                      </a>
                    </div>
                  </div>
                </p>
                {/* <p>
                  <div className="card">
                    <div className={`card-body ${classes.homepage}`}>
                      <h5 className="card-title">{TransFormString.others}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {TransFormString.subTitleOthers}
                      </h6>
                      <p className="card-text">
                        {TransFormString.homeCardText}
                      </p>
                      <a
                        href={`/others?state=${currentState.stateId}`}
                        className="card-link"
                      >
                        {currentState.stateName} State
                      </a>
                      <a href={`/others/state=0`} className="card-link">
                        {TransFormString.allOverIndia}
                      </a>
                    </div>
                  </div>
                </p> */}
              </div>
              {/* <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div> */}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow bg-light">
              <div className="card-body">
                <h5 className="card-title">
                  {TransFormString.quickLinksAdmission}
                </h5>
                <p className="card-text">
                  <AutoScrollList items={items} />
                </p>
              </div>
              {/* <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {showDialogue && <SelectStateModal />}
    </>
  );
};

export default Home;
