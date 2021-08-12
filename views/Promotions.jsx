var React = require('react');
var Sidebar = require("./components/Sidebar");


function Promotions(props) {
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
          <Sidebar selected="promotions"/>
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
                  <a className="navbar-brand" href="javascript:;">Promotions</a>
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
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPromotionsModal">Add Promotions</button>




                    <form action="api/localreview/update" method="POST" encType="multipart/form-data" class="modal fade" id="updatePromotionsModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Promotions</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      <div class="form-group">
                          <label for="exampleFormControlInput1">ID Promotions</label>
                          <input id="inputAddPromotions" required name="id" type="text" class="form-control" readOnly/>
                        </div>
                       <div class="form-group">
                          <label for="exampleFormControlInput1">Promotions Name</label>
                          <input id="inputAddPromotions" required name="name" type="text" class="form-control" placeholder="Promotions Name"/>
                        </div>
                        <div class="form-group">
                                <label for="exampleFormControlSelect1">Related Tours</label>
                                <select required name="relatedtours" class="form-control relatedtourselect" id="inputAddPromotions">
                                  {
                                    props.tours.map((item,index)=>{
                                      return (
                                        <option value={item.id_tours}>{item.name}</option>
                                      )
                                    })
                                  }
                                </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">From Date</label>
                          <input id="inputAddPromotions" required name="fromdate" type="date" class="form-control"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">To Date</label>
                          <input id="inputAddPromotions" required name="todate" type="date" class="form-control"/>
                        </div>
                        <div id="containerDescription" class="form-group">
                          <label for="exampleFormControlInput1">Description</label>
                          <textarea id="inputAddPromotions" required name="description" type="text" class="form-control descriptionnote" placeholder="Description"/>
                        </div>
                        <div id="containerRedemptionInstruction" class="form-group">
                          <label for="exampleFormControlInput1">Redemption Instruction</label>
                          <textarea id="inputAddPromotions" required name="redemptioninstruction" type="text" class="form-control redemptioninstructionnote" placeholder="Redemption Instruction"/>
                        </div>
                        <div id="containerTermsAndConditions" class="form-group">
                          <label for="exampleFormControlInput1">Terms and Conditions</label>
                          <textarea id="inputAddPromotions" required name="termsandconditions" type="text" class="form-control termsandconditionsnote" placeholder="Terms and Conditions"/>
                        </div>
                        <div id="containerDisclaimer" class="form-group">
                          <label for="exampleFormControlInput1">Disclaimer</label>
                          <textarea id="inputAddPromotions" required name="disclaimer" type="text" class="form-control disclaimernote" placeholder="Disclaimer"/>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>






                    <form action="api/promotions/create" method="POST" encType="multipart/form-data" class="modal fade" id="addPromotionsModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Promotions</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                       <div class="form-group">
                          <label for="exampleFormControlInput1">Promotions Name</label>
                          <input id="inputAddPromotions" required name="name" type="text" class="form-control" placeholder="Promotions Name"/>
                        </div>
                        <div class="form-group">
                                <label for="exampleFormControlSelect1">Related Tours</label>
                                <select required name="relatedtours" class="form-control" id="exampleFormControlSelect1">
                                  {
                                    props.tours.map((item,index)=>{
                                      return (
                                        <option value={item.id_tours}>{item.name}</option>
                                      )
                                    })
                                  }
                                </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">From Date</label>
                          <input id="inputAddPromotions" required name="fromdate" type="date" class="form-control"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">To Date</label>
                          <input id="inputAddPromotions" required name="todate" type="date" class="form-control"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Description</label>
                          <textarea id="inputAddPromotions" required name="description" type="text" class="form-control descriptionnote" placeholder="Description"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Redemption Instruction</label>
                          <textarea id="inputAddPromotions" required name="redemptioninstruction" type="text" class="form-control redemptioninstructionnote" placeholder="Redemption Instruction"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Terms and Conditions</label>
                          <textarea id="inputAddPromotions" required name="termsandconditions" type="text" class="form-control termsandconditionsnote" placeholder="Terms and Conditions"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Disclaimer</label>
                          <textarea id="inputAddPromotions" required name="disclaimer" type="text" class="form-control disclaimernote" placeholder="Disclaimer"/>
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
                                <th> Promotions Name </th> 
                                <th> Related Tours</th> 
                                <th> From </th> 
                                <th> To</th>
                                <th> Description </th>
                                <th> Redemption Instruction </th>
                                <th> Terms and Conditions </th>
                                <th> Disclaimer </th>
                                <th> Action </th>
                            </tr>
                            </thead> 
                            <tbody> 
                            {
                              props.promotions.map((item,index)=>{
                                return (
                                  <tr> 
                                      <td data-id={item.id_promotions} id="no"> {index+1} </td> 
                                      <td id="promotions">{item.promotions_name}</td> 
                                      <td data-id={item.id_tours} id="relatedtours"> {item.toursname}</td>
                                      <td id="from">{`${item.from_time.getFullYear()}-${item.from_time.getMonth()+1>9 ? item.from_time.getMonth()+1:'0'+(item.from_time.getMonth()+1)}-${item.from_time.getDate()}`}</td>
                                      <td id="to">{`${item.to_time.getFullYear()}-${item.to_time.getMonth()+1>9 ? item.to_time.getMonth()+1:'0'+(item.to_time.getMonth()+1)}-${item.to_time.getDate()}`}</td>
                                      <td id="description">
                                        <span style={{display:"none"}} id="content" data-content={item.description}></span>
                                        {item.description}
                                      </td>
                                      <td id="redemptioninstruction">
                                      <span style={{display:"none"}} id="content" data-content={item.redemptioninstruction}></span>
                                        {item.redemptioninstruction}
                                        </td>
                                      <td id="termsandconditions">
                                      <span style={{display:"none"}} id="content" data-content={item.termsandconditions}></span>
                                        {item.termsandconditions}
                                        </td>
                                      <td id="disclaimer">
                                      <span style={{display:"none"}} id="content" data-content={item.disclaimer}></span>
                                        {
                                          item.disclaimer
                                        }
                                        </td>
                                      <td>
                                          <div id="contentUpdateSpotlights" style={{display:"none"}}>asdasdsadasdasd</div>
                                          <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                          <form>
                                              <button id="btnUpdate" type="button" data-toggle="modal" data-target="#updatePromotionsModal" class="btn btn-warning">UPDATE</button>
                                          </form>
                                          <form action={`/api/promotions/delete/${item.id_promotions}`} method="POST">
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
      <script src="static/assets/promotions.js" type="text/javascript"></script>
    <script src="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/js/bootstrap-datepicker.min.js"></script>
      </html>
  );
}

module.exports = Promotions;


