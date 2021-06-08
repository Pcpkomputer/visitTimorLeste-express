var React = require('react');
var useEffect = require('react').useEffect;
var Sidebar = require("./components/Sidebar");



function Tours(props) {

  let trimText = (text)=>{
    if(text.length>=50){
      let str = '';
      for(let i=0;i<50;i++){
        str+=text[i];
      }
      return str+"...";
    }
    else{
      return text;
    }
  
  }

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
      <link href="static/assets/clockpicker/bootstrap-clockpicker.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css"/>


      
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
              <div className="row" style={{margin:0}}>
               
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addToursModal">Add Tours</button>
           
                <form action="api/tours/create" method="POST" encType="multipart/form-data" class="modal fade" id="addToursModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" style={{maxWidth:1300}} role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Tours</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body row" style={{padding:"2rem"}}>
                          <input required style={{display:"none"}} id="inputScheduleAddTours" type="text" name="schedule"></input>
                          <div class="col-lg-6" style={{marginBottom:20}}>
                              <div class="form-group">
                                <label for="exampleFormControlSelect1">Category</label>
                                <select required name="category" class="form-control" id="exampleFormControlSelect1">
                                    {
                                      props.category.map((item,index)=>{
                                        return (
                                          <option value={item.id_category}>{item.category_name}</option>
                                        )
                                      })
                                    }
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
                          <div class="col-lg-6" style={{display:"flex",flexDirection:"column",marginBottom:20}}>
                              <div style={{display:"flex",flexDirection:"row",marginBottom:20}}>
                                  <div style={{flex:1,paddingRight:20}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">Days</label>
                                      <select id="dayTimeInputAdd" required class="form-control">
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option valye="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Public Holiday">Public Holiday</option>
                                      </select>
                                    </div>
                                </div>
                                <div style={{flex:1,paddingRight:20}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">From :</label>
                                      <div class="input-group clockpicker">
                                          <input id="fromTimeInputAdd" readOnly type="text" class="form-control" style={{border:"solid 1px #dbdbdb",borderRadius:5}} value="09:30"/>
                                          <span class="input-group-addon">
                                              <span class="glyphicon glyphicon-time"></span>
                                          </span>
                                      </div>
                                    </div>
                                </div>
                                <div style={{flex:1,paddingRight:20}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">To :</label>

                                          <input id="toTimeInputAdd" readOnly type="text" class="form-control clockpicker" style={{border:"solid 1px #dbdbdb",borderRadius:5}} value="09:30"/>
                                          <span class="input-group-addon">
                                              <span class="glyphicon glyphicon-time"></span>
                                          </span>
       
                                    </div>
                                </div>
                                 <div style={{flex:1}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1" style={{opacity:0,cursor:"default"}}>To :</label>

                                       
                                          <button id="addTimeTours" type="button"  class="form-control btn-success">Add</button>
       
                                    </div>
                                </div>
                            </div>
                            <div style={{display:"flex",flex:1,maxHeight:814,overflow:"auto"}}>
                                  <table class="table table-bordered table-hover">
                                      <thead>
                                        <tr>
                                          <th scope="col">Days</th>
                                          <th scope="col">From :</th>
                                          <th scope="col">To :</th>
                                        </tr>
                                      </thead>
                                      <tbody id="contentAddTimeTours">
                                      </tbody>
                                </table>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="realSubmitAddTours" type="submit" style={{display:"none"}} class="btn btn-primary">Submit</button>
                        <button id="submitAddTours" type="button" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>




                <form action="api/tours/update/undefined" method="POST" encType="multipart/form-data" class="modal fade" id="updateToursModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
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
                          <input id="inputUpdateTours" readOnly required name="id" type="text" class="form-control" placeholder=""/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Category</label>
                          <select id="inputUpdateTours" name="category" required class="form-control categoryvalue" >
                              {
                                props.category.map((item,index)=>{
                                  return (
                                    <option value={item.id_category}>{item.category_name}</option>
                                  )
                                })
                              }
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Tours Name</label>
                          <input id="inputUpdateTours" required name="name" type="text" class="form-control" placeholder="Adara Eco-Resort (Mario’s Place)"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Address</label>
                          <input id="inputUpdateTours" required name="address" type="text" class="form-control" placeholder="J.C. Zulueta St, Oton, 5020 Iloilo, Philippines"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Website</label>
                          <input id="inputUpdateTours" required name="website" type="text" class="form-control" placeholder="https://www.timorleste.tl/plan-your-trip/accommodation/"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Phone</label>
                          <input id="inputUpdateTours" required name="phone" type="text" class="form-control" placeholder="(+670) 207760 205333"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Description</label>
                          <textarea id="inputUpdateTours" required name="description" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Image</label>
                          <button id="btnSubmitToursImageUpdate" type="button" class="btn btn-primary form-control">Upload Image</button>
                          <image id="previewToursImageUpdate" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                          <input name="image" accept=".jpg,.png" style={{display:"none"}} id="inputToursImageUpdate" type="file"></input>
                        
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>





                <form action="api/tours/:id/schedule/update" method="POST" encType="multipart/form-data" class="modal fade" id="updateTimeToursModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Time Tours</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div id="loadingIndicatorUpdateTimeTours" style={{position:"absolute",display:"none",width:"100%",height:"100%",zIndex:100,justifyContent:"center",alignItems:"center"}}>
                            <div style={{backgroundColor:"black",opacity:0.7,position:"absolute",width:"100%",height:"100%",zIndex:1}}></div>
                            <div style={{color:"white",zIndex:100}}>Loading data...</div>
                      </div>
                      <div class="modal-body">
                         
                            <div style={{display:"flex",flexDirection:"row",marginBottom:20}}>
                                  <div style={{flex:1,paddingRight:20}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">Days</label>
                                      <select id="dayTimeInputAdd" required class="form-control">
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option valye="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Public Holiday">Public Holiday</option>
                                      </select>
                                    </div>
                                </div>
                                <div style={{flex:1,paddingRight:20}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">From :</label>
                                      <div class="input-group clockpicker">
                                          <input id="fromTimeInputAdd" readOnly type="text" class="form-control" style={{border:"solid 1px #dbdbdb",borderRadius:5}} value="09:30"/>
                                          <span class="input-group-addon">
                                              <span class="glyphicon glyphicon-time"></span>
                                          </span>
                                      </div>
                                    </div>
                                </div>
                                <div style={{flex:1,paddingRight:20}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">To :</label>

                                          <input id="toTimeInputAdd" readOnly type="text" class="form-control clockpicker" style={{border:"solid 1px #dbdbdb",borderRadius:5}} value="09:30"/>
                                          <span class="input-group-addon">
                                              <span class="glyphicon glyphicon-time"></span>
                                          </span>
       
                                    </div>
                                </div>
                                <div style={{flex:1}}>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1" style={{opacity:0,cursor:"default"}}>To :</label>

                                       
                                          <button id="addUpdateTimeTours" type="button"  class="form-control btn-success">Add</button>
       
                                    </div>
                                </div>
                            </div>
                            <div style={{display:"flex",flex:1,maxHeight:814,overflow:"auto"}}>
                                  <table class="table table-bordered table-hover">
                                      <thead>
                                        <tr>
                                          <th scope="col">Days</th>
                                          <th scope="col">From :</th>
                                          <th scope="col">To :</th>
                                        </tr>
                                      </thead>
                                      <tbody id="contentAddTimeTours">
                                      </tbody>
                                </table>
                            </div>
                            <input id="updateTimeToursValue" name="time" style={{display:"none"}} type="text"></input>
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
                          {
                            props.tours.map((item,index)=>{
                                return (
                                  <tr> 
                                  <td data-id={item.id_tours} id="no"> {index+1} </td> 
                                  <td data-id={item.id_category} id="category">{item.category_name}</td> 
                                  <td id="name"> {item.name} </td> 
                                  <td id="address"> {item.address} </td> 
                                  <td id="website"> {item.website} </td> 
                                  <td id="phone"> {item.phone} </td> 
                                  <td id="description"> {trimText(item.description)}</td> 
                                  <td>
                                    <button id="btnEditTimeTours" type="button" class="btn btn-info">EDIT</button>
                                  </td> 
                                  <td id="image">
                                    <image style={{width:200,height:130,maxWidth:"none"}} src={`/static/image/tours/${item.image}`}></image>
                                  </td>
                                  <td>
                                      <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                        <form>
                                          <button id="btnUpdate" type="button" class="btn btn-warning">UPDATE</button>
                                        </form>
                                        <form action={`/api/tours/delete/${item.id_tours}`} method="POST">
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
      <script src="static/assets/tours.js" type="text/javascript"></script>
      </html>
  );
}

module.exports = Tours;


