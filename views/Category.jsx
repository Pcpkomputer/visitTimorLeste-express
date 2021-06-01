var React = require('react');
var Sidebar = require("./components/Sidebar");


function Category(props) {

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
      <link href="static/assets/clockpicker/bootstrap-clockpicker.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css"/>
      </head>
      <body>
        <div className="wrapper ">
          <Sidebar selected="category"/>
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
                  <a className="navbar-brand" href="javascript:;">Category</a>
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




                <form action="api/category/create" method="POST" encType="multipart/form-data" class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Category Name</label>
                          <input id="inputAddCategory" required name="id" type="text" class="form-control" placeholder="Category Name"/>
                        </div>
                        <div class="form-group">
                            <button id="btnUploadImageCategory" type="button" class="btn btn-primary form-control">Upload Image</button>
                            <image id="previewCategoryImage" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                            <input required name="image" accept=".jpg,.png" style={{display:"none"}} id="inputCategoryImage" type="file"></input>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>




                
                <form action="api/category/update/:id" method="POST" encType="multipart/form-data" class="modal fade" id="updateCategoryModal" tabindex="-1" role="dialog" aria-labelledby="addToursModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="exampleFormControlInput1">ID</label>
                          <input id="inputUpdateCategory" readOnly required name="id" type="text" class="form-control" placeholder="Category ID"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Category Name</label>
                          <input id="inputUpdateCategory" required name="name" type="text" class="form-control" placeholder="Category Name"/>
                        </div>
                        <div class="form-group">
                            <button id="btnUploadImageCategory" type="button" class="btn btn-primary form-control">Upload Image</button>
                            <image id="previewCategoryImage" src="" style={{objectFit:"cover",backgroundColor:"whitesmoke",width:"100%",height:300,marginTop:15}}></image>
                            <input name="image" accept=".jpg,.png" style={{display:"none"}} id="inputCategoryImage" type="file"></input>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>




                <div className="row" style={{margin:0}}>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addCategoryModal">Add Category</button>
                    <div class="table-responsive"> 
                        <table id="table" class="table"> 
                            <thead class=" text-primary"> 
                            <tr>
                                <th> No</th> 
                                <th> Category Name</th> 
                                <th> Image </th>
                                <th> Action </th>
                            </tr>
                            </thead> 
                            <tbody> 
                            <tr> 
                                <td data-id="21398129sa21398127938" id="no"> 1 </td> 
                                <td id="name"> Attractions</td> 
                                <td id="image">
                                    <image style={{width:200,height:130,maxWidth:"none"}} src="/static/image/category/[an8-Yuukong] Sword Art Online Alicization - 24 [08C68E65].mkv_snapshot_01.09_[2020.09.20_06.07.04].jpg-1622529957710-183161681.jpg"></image>
                                </td>
                                <td>
                                    <div style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}}>
                                    <form>
                                        <button id="btnUpdate" type="button" data-toggle="modal" data-target="#updateCategoryModal" class="btn btn-warning">UPDATE</button>
                                    </form>
                                    <form action="/api/category/delete/1" method="POST">
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
      <script src="static/assets/clockpicker/bootstrap-clockpicker.min.js" type="text/javascript"></script>
      <script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>
      <script src="static/assets/category.js" type="text/javascript"></script>
      </html>
  );
}

module.exports = Category;


