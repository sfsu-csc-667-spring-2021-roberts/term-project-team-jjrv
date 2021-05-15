const checkAuthentication = (request, response, next) => {
    console.log('In checkAuthenticated', request.isAuthenticated(), request.user);
    if (request.isAuthenticated()) {
      next();
    } else {
      response.redirect('/');
    }
  };
  
  module.exports = checkAuthentication;