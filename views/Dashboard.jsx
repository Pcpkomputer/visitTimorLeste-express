var React = require('react');
var Sidebar = require("./components/Sidebar");


function Dashboard(props) {
  return (
      <html style={{backgroundColor:"#f4f3ef"}}>
      <head>
      <title>{props.title}</title>
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"/>
      <link href="static/assets/css/bootstrap.min.css" rel="stylesheet" />
      <link href="static/assets/css/paper-dashboard.css?v=2.0.1" rel="stylesheet" />
      <link href="static/assets/demo/demo.css" rel="stylesheet" />
      </head>
      <body>
        <div className="wrapper ">
          <Sidebar selected="dashboard"/>
          <div className="main-panel" style={{height: '100vh'}}>
            <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
              <div className="container-fluid">
                <div className="navbar-wrapper">
                  <div className="navbar-toggle">
                    <button type="button" className="navbar-toggler">
                      <span className="navbar-toggler-bar bar1" />
                      <span className="navbar-toggler-bar bar2" />
                      <span className="navbar-toggler-bar bar3" />
                    </button>
                  </div>
                  <a className="navbar-brand" href="javascript:;">Dashboard</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-bar navbar-kebab" />
                  <span className="navbar-toggler-bar navbar-kebab" />
                  <span className="navbar-toggler-bar navbar-kebab" />
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navigation">
                  <ul className="navbar-nav">
                    <li className="nav-item btn-rotate dropdown">
                      <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="nc-icon nc-bell-55" />
                        <p>
                          <span className="d-lg-none d-md-block">Some Actions</span>
                        </p>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Logout</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="content">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{marginTop: '10px'}}>Tours</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Total Tours</h6>
                      <h3 style={{marginBottom: '10px'}}>5</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{marginTop: '10px'}}>Category</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Total Category</h6>
                      <h3 style={{marginBottom: '10px'}}>10</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{marginTop: '10px'}}>Spotlights</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Total Spotlights</h6>
                      <h3 style={{marginBottom: '10px'}}>4</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{marginTop: '10px'}}>Promotions</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Total Promotions</h6>
                      <h3 style={{marginBottom: '10px'}}>8</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{marginTop: '10px'}}>User</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Total User</h6>
                      <h3 style={{marginBottom: '10px'}}>8</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title" style={{marginTop: '10px'}}>Review</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Total Review</h6>
                      <h3 style={{marginBottom: '10px'}}>8</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </body>
      <script src="static/assets/js/core/jquery.min.js"></script>
      <script src="static/assets/js/core/popper.min.js"></script>
      <script src="static/assets/js/core/bootstrap.min.js"></script>
      <script src="static/assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
      <script src="static/assets/js/plugins/chartjs.min.js"></script>
      <script src="static/assets/js/plugins/bootstrap-notify.js"></script>
      <script src="static/assets/js/paper-dashboard.min.js?v=2.0.1" type="text/javascript"></script>
      <script src="static/assets/tours.js" type="text/javascript"></script>
      </html>
  );
}

module.exports = Dashboard;


