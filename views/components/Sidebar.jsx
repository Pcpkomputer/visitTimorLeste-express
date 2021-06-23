var React = require('react');

function SideBar(props){
  return (
    <div className="sidebar" data-color="white" data-active-color="danger">
      <div className="logo">
        <a href="https://www.creative-tim.com" className="simple-text logo-mini">
        </a>
        <a href="https://www.creative-tim.com" className="simple-text logo-normal">
          Visit Timor Leste
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className={`${(props.selected==="dashboard") ? "active":""}`}>
            <a href="/">
              <i className="nc-icon nc-layout-11" />
              <p>Dashboard</p>
            </a>
          </li>
          <li className={`${(props.selected==="tours") ? "active":""}`}>
            <a href="tours">
              <i className="nc-icon nc-pin-3" />
              <p>TOURS</p>
            </a>
          </li>
          <li className={`${(props.selected==="category") ? "active":""}`}>
            <a href="category">
              <i className="nc-icon nc-bookmark-2"/>
              <p>CATEGORY</p>
            </a>
          </li>
          <li className={`${(props.selected==="spotlights") ? "active":""}`}>
            <a href="spotlights">
              <i className="nc-icon nc-tag-content" />
              <p>SPOTLIGHTS</p>
            </a>
          </li>
          <li className={`${(props.selected==="localreview") ? "active":""}`}>
            <a href="localreview">
              <i className="nc-icon nc-support-17" />
              <p>LOCAL REVIEW</p>
            </a>
          </li>
          <li className={`${(props.selected==="precinct") ? "active":""}`}>
            <a href="precinct">
              <i className="nc-icon nc-istanbul" />
              <p>PRECINCT</p>
            </a>
          </li>
          <li className={`${(props.selected==="promotions") ? "active":""}`}>
            <a href="promotions">
              <i className="nc-icon nc-scissors" />
              <p>PROMOTIONS</p>
            </a>
          </li>
          <div class="logo"></div>
          <li className={`${(props.selected==="user") ? "active":""}`}>
            <a href="user">
              <i className="nc-icon nc-single-02" />
              <p>USER</p>
            </a>
          </li>
          <li className={`${(props.selected==="account") ? "active":""}`}>
            <a href="account">
              <i className="nc-icon nc-single-02" />
              <p>ACCOUNT</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

module.exports = SideBar;
