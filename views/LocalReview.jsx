var React = require('react');
var Sidebar = require("./components/Sidebar");


function LocalReview(props) {
  return (
      <html>
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
          <Sidebar selected="localreview"/>
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
              <div className="row" style={{margin:0}}>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addSpotlightsModal">Add Local Review</button>
                    <div class="table-responsive"> 
                        <table id="table" class="table"> 
                            <thead class=" text-primary"> 
                            <tr>
                                <th> No</th> 
                                <th> Related Tours</th> 
                                <th> User</th> 
                                <th> Quote</th> 
                                <th> Why Should Visit</th>
                                <th> Special Tip </th>
                            </tr>
                            </thead> 
                            <tbody> 
                            <tr> 
                                
                                <td data-id="21398129sa21398127938" id="no"> 1 </td> 
                                <td id="name"> The cruious case of the missing peranakan Treasurezzz </td> 
                                <td id="tours"> Merlion Park</td>
                                <td id="dateposted">2021-12-06 05:00:00</td>
                                <td id="image">
                                    <image style={{width:200,height:130,maxWidth:"none"}} src="/static/image/spotlights/mike.jpg"></image>
                                </td>
                                <td>
                                    <div id="contentUpdateSpotlights" style={{display:"none"}}>asdasdsadasdasd</div>
                                    <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                    <form>
                                        <button id="btnUpdate" type="button" data-toggle="modal" data-target="#updateSpotlightsModal" class="btn btn-warning">UPDATE</button>
                                    </form>
                                    <form action="/api/spotlights/delete/1" method="POST">
                                        <button type="submit" class="btn btn-danger">DELETE</button>
                                    </form>
                                    </div>
                                </td>
                            </tr> 
                            </tbody>
                         </table> 
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

module.exports = LocalReview;


