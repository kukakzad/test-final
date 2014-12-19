angular.module('StoreApp.service', [])

.factory('Products', ['$http',
  function($http) {

    return {
      getAll: function(callback) {
        $http.get('/getProducts')
          .success(function(data, status, headers, config){
            callback(data);
          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      },
      addProduct: function(inputProduct,inputPrice,user,callback) {
        var tmp = {
          product: inputProduct,
          price: inputPrice,
          done:  "false",
          user: user
        };

        $http.get('/addProduct',{params : tmp})
          .success(function(data, status, headers, config) {
            callback(data);

          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      },
      deleteProduct: function(index, callback) {
        $http.get('/deleteProduct/'+index)
          .success(function(data, status, headers, config) {
            callback(data);
          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      },
      editProduct: function(page, callback) {
        $http.get('/updateProduct/'+page._id, {params : page})
          .success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {
            callback({
              error: 1
            });
          });
      },
      addUser: function(inputUser,inputPassword, callback) {
        var tmp = {
          user: inputUser,
          pass: inputPassword    
          };
        $http.get('addUser/', {params: tmp})
          .success(function(data) {
            callback(data);
          }).
          error(function(data) {
            callback({
              error: 1
            });
          });
      },
      checkUser: function(inputUser,inputPassword, callback) {
        var tmp = {
          user: inputUser,
          pass: inputPassword    
          };
        $http.get('checkUser/', {params: tmp})
          .success(function(data) {
            callback(data);
          }).
          error(function(data) {
            callback({
              error: 1
            });
          });
      }
    };
  }]);
