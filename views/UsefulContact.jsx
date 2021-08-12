var React = require('react');
var Sidebar = require("./components/Sidebar");


function UsefulContact(props) {
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
      <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet"/>
      <link href="static/assets/clockpicker/bootstrap-clockpicker.min.css" rel="stylesheet" />
      <link id="bsdp-css" href="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/css/bootstrap-datepicker3.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css"/>
      </head>
      <body>
        <div className="wrapper ">
          <Sidebar selected="usefulcontact"/>
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
                  <a className="navbar-brand" href="javascript:;">Useful Contact</a>
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
                        <a className="dropdown-item" href="/logout">Logout</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="content">
              <div className="row" style={{margin:0}}>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addHandyTipsModal">Add Useful Contact</button>




                    <form action="api/usefulcontact/update" method="POST" encType="multipart/form-data" class="modal fade" id="updateHandyTipsModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Useful Contact</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">ID Tips</label>
                                <input id="inputAddHandyTips" required name="id" type="text" class="form-control" readOnly/>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Useful Contact Name</label>
                                <input id="inputAddHandyTips" required name="name" type="text" class="form-control" placeholder="Tips Name"/>
                            </div>
                            <div class="form-group" id="containerupdatetipscontent">
                                <label for="exampleFormControlInput1">Useful Contact Content</label>
                                <textarea  required id="updatetipscontent" name="content" class="form-control"/>
                            </div>
                    </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>






                    <form action="api/usefulcontact/create" method="POST" encType="multipart/form-data" class="modal fade" id="addHandyTipsModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Useful Contact</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Contact Name</label>
                                <input id="inputAddHandyTips" required name="name" type="text" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Contact Content</label>
                                <textarea id="inputAddHandyTips" required id="contentAddTips" class="form-control" name="content"></textarea>
                            </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
















                    <div class="table-responsive"> 
                        <table id="table" class="table"> 
                            <thead class=" text-primary"> 
                            <tr>
                                <th> No</th> 
                                <th> Contact Name</th> 
                                <th> Content</th> 
                                <th> Action </th>
                            </tr>
                            </thead> 
                            <tbody> 
                
                              {
                                props.contact.map((element,index)=>{
                                  return (
                                    <tr> 
                                        <td data-id={element.id_usefulcontact} id="no">{index+1}</td> 
                                        <td id="name">{element.usefulcontact_name}</td> 
                                        <td id="content">{element.content.slice(0,60)+"..."}</td>
                                        <td>
                                            <div id="contentUpdateHandyTips" data-content={element.content} style={{display:"none"}}></div>
                                            <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                            <form>
                                                <button id="btnUpdate" type="button" data-toggle="modal" data-target="#updateHandyTipsModal" class="btn btn-warning">UPDATE</button>
                                            </form>
                                            <form action={`/api/usefulcontact/delete/${element.id_usefulcontact}`} method="POST">
                                                <button type="submit" class="btn btn-danger">DELETE</button>
                                            </form>
                                            </div>
                                        </td>
                                    </tr> 
                                  )
                                })
                              }
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
      <script src="static/assets/clockpicker/bootstrap-clockpicker.min.js" type="text/javascript"></script>
      <script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
      <script src="static/assets/usefulcontact.js" type="text/javascript"></script>
    <script src="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/js/bootstrap-datepicker.min.js"></script>
      </html>
  );
}

module.exports = UsefulContact;


