import React, { useEffect, useState } from "react";
import useAllDataStore from "../APIStore/Store";
import { useNavigate } from "react-router-dom";

const SelectStateModal: React.FC = () => {
  const navigate = useNavigate();
  const [stateSelected, setState] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const { stateList, getAllStates } = useAllDataStore();
  useEffect(() => {
    if (stateList && stateList?.length === 0) {
      getAllStates();
    }
  }, []);
  const handleSubmit = () => {
    if (+stateSelected) {
      navigate(`/Home?state=${stateSelected}`);
      window.location.reload();
    }
  };
  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ backgroundColor: "rgb(0 0 0 / 82%" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">State</h5>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="state" className="d-flex">
                      State:
                    </label>
                    <select
                      id="state"
                      autoFocus
                      value={stateSelected}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      onBlur={() => setTouched(true)}
                      className={`form-select ${
                        touched
                          ? stateSelected
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="0">Select State</option>
                      {stateList.map((listItem, index) => (
                        <option key={index} value={listItem.stateId}>
                          {listItem.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectStateModal;
