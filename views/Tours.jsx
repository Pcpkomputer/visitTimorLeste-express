var React = require('react');
var useEffect = require('react').useEffect;
var Sidebar = require("./components/Sidebar");



function Tours(props) {

  let trimText = (text)=>{
     let str = '';
     for(let i=0;i<50;i++){
       str+=text[i];
     }
     return str+"...";
  }

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
          <Sidebar selected="tours"/>
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
                  <a className="navbar-brand" href="javascript:;">Tours</a>
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
              {
                (props.message) ?
                <div className="row">
                    <div class={`alert alert-${props.class}`} role="alert">
                      {
                        props.message
                      }
                    </div>
                </div>:null
              }
              <div className="row">
               
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addToursModal">Add Tours</button>
           
                <form action="api/tours/create" method="POST" encType="multipart/form-data" class="modal fade" id="addToursModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Tours</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Category</label>
                          <select required name="category" class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Tours Name</label>
                          <input required name="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Adara Eco-Resort (Mario’s Place)"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Address</label>
                          <input required name="address" type="text" class="form-control" id="exampleFormControlInput1" placeholder="J.C. Zulueta St, Oton, 5020 Iloilo, Philippines"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Website</label>
                          <input required name="website" type="text" class="form-control" id="exampleFormControlInput1" placeholder="https://www.timorleste.tl/plan-your-trip/accommodation/"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Phone</label>
                          <input required name="phone" type="text" class="form-control" id="exampleFormControlInput1" placeholder="(+670) 207760 205333"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Description</label>
                          <textarea required name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Image</label>
                          <button id="btnSubmitTours" type="button" class="btn btn-primary form-control">Upload Image</button>
                          <image id="previewToursImage" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                          <input required name="image" accept=".jpg,.png" style={{display:"none"}} id="inputToursImage" type="file"></input>
                        
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>




                <form action="api/tours/update/1" method="POST" encType="multipart/form-data" class="modal fade" id="updateToursModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Tours</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="exampleFormControlInput1">ID Tours</label>
                          <input readOnly required name="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Adara Eco-Resort (Mario’s Place)"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Category</label>
                          <select required name="category" class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Tours Name</label>
                          <input required name="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Adara Eco-Resort (Mario’s Place)"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Address</label>
                          <input required name="address" type="text" class="form-control" id="exampleFormControlInput1" placeholder="J.C. Zulueta St, Oton, 5020 Iloilo, Philippines"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Website</label>
                          <input required name="website" type="text" class="form-control" id="exampleFormControlInput1" placeholder="https://www.timorleste.tl/plan-your-trip/accommodation/"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Phone</label>
                          <input required name="phone" type="text" class="form-control" id="exampleFormControlInput1" placeholder="(+670) 207760 205333"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Description</label>
                          <textarea required name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Image</label>
                          <button id="btnSubmitTours" type="button" class="btn btn-primary form-control">Upload Image</button>
                          <image id="previewToursImage" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                          <input required name="image" accept=".jpg,.png" style={{display:"none"}} id="inputToursImage" type="file"></input>
                        
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
                    <table class="table"> 
                        <thead class=" text-primary"> 
                          <tr>
                            <th> No</th> 
                            <th> Category</th> 
                            <th> Name</th> 
                            <th> Address</th>  
                            <th> Website</th>  
                            <th> Phone</th>  
                            <th> Description</th> 
                            <th> Schedule</th>
                            <th> Image</th> 
                            <th> Action </th>
                          </tr>
                        </thead> 
                        <tbody> 
                          <tr> 
                            <td> 1 </td> 
                            <td> Attraction </td> 
                            <td> Merlion Park </td> 
                            <td> 1 Fullerton Road Singapore 049213 </td> 
                            <td> http://visitsingapore.sg </td> 
                            <td> 081103245 </td> 
                            <td> {trimText('The merlion park isadnhasklndsjklandsajndksjandkjsandskjandkasjndkjsandskjandksjadnskjandkajsndkjsandkjasndkjasnkdjasasdsadsad ')}</td> 
                            <td>
                              <button type="button" class="btn btn-info">EDIT</button>
                            </td> 
                            <td>
                              <image style={{width:200,height:130,maxWidth:"none"}} src="https://blog.tripcetera.com/wp-content/uploads/2019/06/merlion-park-singapore.jpg"></image>
                            </td>
                            <td>
                                <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                  <form>
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#updateToursModal">UPDATE</button>
                                  </form>
                                  <form action="/api/tours/delete/1" method="POST">
                                    <button type="submit" class="btn btn-danger">DELETE</button>
                                  </form>
                                </div>
                            </td>
                          </tr> 
                          <tr> 
                            <td> 1 </td> 
                            <td> Attraction </td> 
                            <td> Merlion Park </td> 
                            <td> 1 Fullerton Road Singapore 049213 </td> 
                            <td> http://visitsingapore.sg </td> 
                            <td> 081103245 </td> 
                            <td> {trimText('The merlion park isadnhasklndsjklandsajndksjandkjsandskjandkasjndkjsandskjandksjadnskjandkajsndkjsandkjasndkjasnkdjasasdsadsad ')}</td> 
                            <td>
                              <button type="button" className="btn btn-info">EDIT</button>
                            </td> 
                            <td>
                              <image style={{width:200,height:130,maxWidth:"none"}} src="https://blog.tripcetera.com/wp-content/uploads/2019/06/merlion-park-singapore.jpg"></image>
                            </td>
                            <td>
                                <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                  <button type="button" className="btn btn-warning">CHANGE</button>
                                  <button type="button" className="btn btn-danger">DELETE</button>
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

module.exports = Tours;


