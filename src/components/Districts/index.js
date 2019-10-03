import React, { Component } from "react";
import { Link } from "react-router-dom";

import DistrictSortFilter from "./DistrictSortFilter";
import District from "./District";

import "./css/Districts.css";

class Districts extends Component {
  state = {
    collapse: true,
    districts: [
      {
        name: "Texas 21st Congressional District",
        population: "818,281",
        medianIncome: "71,486",
        avgAge: "37.9",
        genderRatio: "0.97",
        representative: "Chip Roy",
        senators: "John Cornyn, Ted Cruz",
        peoplePerSquareMile: "136.7",
        povertyRate: "10.3%",
        numHouseholds: "315,100"
      },
      {
        name: "Texas 10th Congressional District",
        population: "896,798",
        medianIncome: "75,517",
        avgAge: "35.9",
        genderRatio: "0.99",
        representative: "Michael T. McCaul",
        senators: "John Cornyn, Ted Cruz",
        peoplePerSquareMile: "166.9",
        povertyRate: "7.9%",
        numHouseholds: "290,104"
      },
      {
        name: "Texas 31st Congressional District",
        population: "883,347",
        medianIncome: "70,346",
        avgAge: "35.2",
        genderRatio: "0.97",
        representative: "Bill Flores",
        senators: "John Cornyn, Ted Cruz",
        peoplePerSquareMile: "396.3",
        povertyRate: "8.9%",
        numHouseholds: "288,768"
      },
    ]
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  render() {
    const districtsRendered = this.state.districts.map((district, i) => {
      return (
        <Link to={{ pathname:`/Districts/instance/${district.name}`, state: district }}>
          <District
            key={i}
            name={district.name}
            population={district.population}
            medianIncome={district.medianIncome}
            avgAge={district.avgAge}
            genderRatio={district.genderRatio}
            representative={district.representative}
            senators={district.senators}
            peoplePerSquareMile={district.peoplePerSquareMile}
            povertyRate={district.povertyRate}
            numHouseholds={district.numHouseholds}
          />
        </Link>
      );
    });
    return (
      <div className="districts-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Districts</h3>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <DistrictSortFilter />}
        </div>
        <div className="districts-container d-flex justify-content-center flex-wrap bd-highlight mb-3">
          {districtsRendered}
        </div>
      </div>
    );
  }
}

export default Districts;
