var React = require('react');
var Sidebar = require("./components/Sidebar");


function Precinct(props) {
  return (
      <html style={{backgroundColor:"#f4f3ef"}}>
      <head>
      <title>{props.title}</title>
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"/>
      <link href="static/assets/css/bootstrap.min.css" rel="stylesheet" />
      <link href="static/assets/css/paper-dashboard.css?v=2.0.1" rel="stylesheet" />
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css"/>
      <link href="static/assets/demo/demo.css" rel="stylesheet" />
      </head>
      <body>
        <div className="wrapper ">
          <Sidebar selected="precinct"/>
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
                  <a className="navbar-brand" href="javascript:;">Precinct</a>
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
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPrecinctModal">Add Precinct</button>





                <form action="/api/precinct/:id/tours/update" method="POST" encType="multipart/form-data" class="modal fade" id="detailToursModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  
                       
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">

                    <div id="loadingIndicatorUpdateDetailTours" style={{position:"absolute",display:"flex",width:"100%",height:"100%",zIndex:100,justifyContent:"center",alignItems:"center"}}>
                                <div style={{backgroundColor:"black",opacity:0.7,position:"absolute",width:"100%",height:"100%",zIndex:1}}></div>
                                <div style={{color:"white",zIndex:100}}>Loading data...</div>
                        </div>


                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detail Tours Precinct</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Tours</label>
                          <div style={{flexDirection:"row",display:"flex"}}>
                                <select id="inputAddPrecinct" required name="relatedtours" style={{marginRight:15}} class="form-control selectInputTours">
                                  {
                                    props.tours.map((item,index)=>{
                                      return (
                                        <option value={item.id_tours}>{item.name}</option>
                                      )
                                    })
                                  }
                                </select>
                                <button id="btnAddTours" type="button" class="btn btn-primary" style={{margin:0}}>Add</button>
                          </div>
                          <input id="jsonvalue" type="text" name="json" style={{display:"none"}}></input>
                          <table  class="table table-bordered table-hover" style={{marginTop:15}}>
                                      <thead>
                                        <tr>
                                          <th scope="col">ID Tours</th>
                                          <th scope="col">Tours Name</th>
                                        </tr>
                                      </thead>
                                      <tbody id="contentAddTours">
                                      </tbody>
                            </table>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="btnSubmit" type="submit" class="btn btn-primary">UPDATE</button>
                      </div>
                    </div>
                  </div>
                </form>








                    <form action="api/precinct/update" method="POST" encType="multipart/form-data" class="modal fade" id="updatePrecinctModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Precinct</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      <div class="form-group">
                            <label for="exampleFormControlInput1">ID Precinct</label>
                            <input id="inputAddPrecinct" readOnly required name="id" type="text" class="form-control" placeholder="Precinct Name"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Precinct Name</label>
                            <input id="inputAddPrecinct" required name="name" type="text" class="form-control" placeholder="Precinct Name"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Mini Description</label>
                          <input id="inputAddPrecinct" required name="minidescription" type="text" class="form-control" placeholder="Mini Description"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Description</label>
                          <textarea id="inputAddPrecinct" required name="description" type="text" class="form-control" placeholder="Description"/>
                        </div>
                        <div class="form-group">
                            <button id="btnUploadImagePrecinct" type="button" class="btn btn-primary form-control">Upload Image</button>
                            <image id="previewPrecinctImage" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                            <input name="image" accept=".jpg,.png" style={{display:"none"}} id="inputPrecinctImage" type="file"></input>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>






                    <form action="api/precinct/create" method="POST" encType="multipart/form-data" class="modal fade" id="addPrecinctModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Precinct</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Precinct Name</label>
                          <input id="inputAddPrecinct" required name="name" type="text" class="form-control" placeholder="Precinct Name"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Mini Description</label>
                          <input id="inputAddPrecinct" required name="minidescription" type="text" class="form-control" placeholder="Mini Description"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Description</label>
                          <textarea id="inputAddPrecinct" required name="description" type="text" class="form-control" placeholder="Description"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Tours</label>
                          <div style={{flexDirection:"row",display:"flex"}}>
                                <select id="inputAddPrecinct" required name="relatedtours" style={{marginRight:15}} class="form-control selectInputTours">
                                  {
                                    props.tours.map((item,index)=>{
                                      return (
                                        <option value={item.id_tours}>{item.name}</option>
                                      )
                                    })
                                  }
                                </select>
                                <button id="btnAddTours" type="button" class="btn btn-primary" style={{margin:0}}>Add</button>
                          </div>
                          <input type="text" style={{display:"none"}} id="jsonlisttours" name="listtours"></input>
                          <table  class="table table-bordered table-hover" style={{marginTop:15}}>
                                      <thead>
                                        <tr>
                                          <th scope="col">ID Tours</th>
                                          <th scope="col">Tours Name</th>
                                        </tr>
                                      </thead>
                                      <tbody id="contentAddPrecinct">
                                      </tbody>
                        </table>
                        <div class="form-group">
                            <button id="btnUploadImagePrecinct" type="button" class="btn btn-primary form-control">Upload Image</button>
                            <image id="previewPrecinctImage" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                            <input required name="image" accept=".jpg,.png" style={{display:"none"}} id="inputPrecinctImage" type="file"></input>
                        </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" id="btnRealSubmit" style={{display:"none"}} class="btn btn-primary">Submit</button>
                        <button type="submit" id="btnFakeSubmit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
















                    <div class="table-responsive"> 
                        <table id="table" class="table"> 
                            <thead class=" text-primary"> 
                            <tr>
                                <th> No</th> 
                                <th> Precinct Name</th> 
                                <th> Mini Description</th>
                                <th> Description</th> 
                                <th> Tours</th> 
                                <th> Image </th>
                                <th> Action </th>
                            </tr>
                            </thead> 
                            <tbody> 
                              {
                                props.precinct.map((item,index)=>{
                                  return (
                                    <tr>                             
                                        <td data-id={item.id_precinct} id="no"> {index+1} </td> 
                                        <td id="precinct">{item.precinct_name}</td> 
                                        <td id="minidescription">{item.mini_description}</td>
                                        <td id="description">{item.description}</td>
                                        <td id="tours">
                                            <button type="button" id="btnDetailTours" data-toggle="modal" data-target="#detailToursModal"  class="btn btn-danger">DETAIL TOURS</button>
                                        </td>
                                        <td id="image">
                                            <image style={{width:200,height:130,maxWidth:"none"}} src={`/static/image/precinct/${item.image}`}></image>
                                        </td>
                                        <td>
                                            <div id="contentUpdateSpotlights" style={{display:"none"}}>asdasdsadasdasd</div>
                                            <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                            <form>
                                                <button id="btnUpdate" type="button" data-toggle="modal" data-target="#updatePrecinctModal" class="btn btn-warning">UPDATE</button>
                                            </form>
                                            <form action={`/api/precinct/delete/${item.id_precinct}`} method="POST">
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
      <script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>
      <script src="static/assets/precinct.js" type="text/javascript"></script>
      </html>
  );
}

module.exports = Precinct;


