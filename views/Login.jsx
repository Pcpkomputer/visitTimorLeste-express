var React = require('react');
var Sidebar = require("./components/Sidebar");


function Login(props) {
    return (
        <div style={{flex:1,display:"flex"}}>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content />
          <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors" />
          <meta name="generator" content="Hugo 0.84.0" />
          <title>Visit Timor Leste - Web Admin</title>
         
          <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sign-in/" />
          {/* Bootstrap core CSS */}
          <link href="https://getbootstrap.com//docs/5.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          {/* Favicons */}
          {/* <link rel="apple-touch-icon" href="https://getbootstrap.com//docs/5.0/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
  <link rel="icon" href="https://getbootstrap.com//docs/5.0/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="https://getbootstrap.com//docs/5.0/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
  <link rel="manifest" href="https://getbootstrap.com//docs/5.0/assets/img/favicons/manifest.json">
  <link rel="mask-icon" href="https://getbootstrap.com//docs/5.0/assets/img/favicons/safari-pinned-tab.svg" color="#7952b3">
  <link rel="icon" href="https://getbootstrap.com//docs/5.0/assets/img/favicons/favicon.ico">
  <meta name="theme-color" content="#7952b3"> */}
          <style dangerouslySetInnerHTML={{__html: "\n      .bd-placeholder-img {\n        font-size: 1.125rem;\n        text-anchor: middle;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      @media (min-width: 768px) {\n        .bd-placeholder-img-lg {\n          font-size: 3.5rem;\n        }\n      }\n    " }} />
          {/* Custom styles for this template */}
          <link href="https://getbootstrap.com/docs/5.0/examples/sign-in/signin.css" rel="stylesheet" />
          <main className="form-signin">
            <form method="POST" action>
            
              <h1 className="h3 fw-normal mt-3" style={{textAlign:"center",marginBottom:30}}>Visit Timor Leste - Web Admin</h1>
              {
              (props.msg) &&
              <div style={{textAlign:"center",marginTop:20,marginBottom:20}}>{props.msg}</div>
             }
              <div className="form-floating">
                <input required type="email" name="email" className="form-control" id="floatingInput" style={{boxShadow: 'none', border: 'none'}} placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input required type="password" name="password" className="form-control" id="floatingPassword" style={{boxShadow: 'none', border: 'none'}} placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" style={{backgroundColor: '#f1936f', outline: 'none', border: 'none', boxShadow: 'none'}} type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-muted" style={{textAlign:"center"}}>© 2021</p>
            </form>
          </main>
        </div>
      );
}

module.exports = Login;