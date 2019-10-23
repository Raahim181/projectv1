import React from "react";
import { Redirect } from "react-router-dom";
import "./css/DistrictInstance.css";

class DistrictInstance extends React.Component {
  state = {
    loading: true,
    district: {},
    representative: {},
    legislationByRepresentative: [],
    legislationBySenate: []
  };
  getName = (state, districtNum) => {
    return state + " Congressional District " + districtNum;
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("https://api.foodmeonce.me/Districts/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          district: data.district[0],
          representative: data.representative[0],
          legislationByRepresentative: data.legislationByRepresentative,
          legislationBySenate: data.legislationBySenate
        });
      });
  }

  render() {
    if (!this.state.loading && this.state.district == null) {
      return <Redirect to="/error" />;
    }
    const district_data = this.state.district;
    const representative = this.state.representative;
    const legislations = {};
    const legisltaionsByRepresentative = this.state.legislationByRepresentative.map(
      (legislation, i) => {
        legislations[legislation.short_title] = true;
        return (
          <a
            key={"byRepresentative" + i}
            href={`/Legislations/instance/${legislation.id}`}
          >
            <p className="m-0">{legislation.short_title}</p>
          </a>
        );
      }
    );
    const legislationsBySenate = this.state.legislationBySenate.map(
      (legislation, i) => {
        if (legislations[legislation.short_title] == null) {
          legislations[legislation.short_title] = true;
          return (
            <a
              key={"bySenate" + i}
              href={`/Legislations/instance/${legislation.id}`}
              className=""
            >
              <p className="m-0">{legislation.short_title}</p>
            </a>
          );
        } else return null;
      }
    );
    let map_url =
      "https://www.govtrack.us/congress/members/embed/mapframe?state=" +
      district_data.state_abbreviation +
      "&district=" +
      district_data.congressional_district;
    if (district_data.length === 0 && !this.state.loading) {
      return <Redirect to="/error" />;
    }
    let districtName = this.getName(district_data.state, district_data.congressional_district)
    var rep_image =
      "https://theunitedstates.io/images/congress/225x275/" +
      representative.id +
      ".jpg";
    return (
      <div
        className="district-instance d-flex border border-secondary
                justify-content-center flex-column align-items-center"
      >
        <div className="district-instance-map">
          <iframe
            title="district"
            width="425"
            height="300"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={map_url}
          ></iframe>
        </div>
        <div className="district-instance-head">
          <p className="district-instance-name">
            {districtName}
          </p>
        </div>
        <div className="district-instance-head">
          <a
            className="district-instance-wiki"
            href={district_data.wiki_page}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia
          </a>
        </div>
        <ul>
          <li className="district-instance-desc">
            <span>Population</span>: {district_data.population}
          </li>
          <li className="district-instance-desc">
            <span>Average Income</span>: ${district_data.mean_income}
          </li>
          <li className="district-instance-desc">
            <span>Average Age</span>: {district_data.median_age}
          </li>
          <li className="district-instance-desc">
            <span>Gender Ratio</span>: {district_data.gender_ratio}
          </li>
          <li className="district-instance-desc">
            <span>Poverty Rate</span>: {district_data.poverty_rate}
          </li>
          <li className="district-instance-desc">
            <span>Households using SNAP</span>: {district_data.snap_rate}
          </li>
          <li className="district-instance-desc">
            <span>Cancer Rate per 100,000</span>: {district_data.cancer_rate}
          </li>
          <li className="district-instance-desc">
            <span>Number of Households</span>: {district_data.num_households}
          </li>
          <li className="district-instance-desc">
            <span>Representative</span>:{" "}
            <a href={`/Representatives/instance/${representative.id}`}>
              {representative.full_name}
            </a>
          </li>
          <li className="district-instance-desc">
            <span>Legislation by Representative</span>:<br />
            {legisltaionsByRepresentative}
            {legislationsBySenate}
          </li>
        </ul>
        <img
          className="district-instance-rep-image"
          src={rep_image}
          alt="us flag"
        />
      </div>
    );
  }
}

export default DistrictInstance;
