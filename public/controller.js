angular.module('StoreApp', ['StoreApp.service'])
  .controller('mainCtrl', ['$scope', 'Products', function($scope, Products) {

    $scope.products = [];
    $scope.gpa = 0;
    $scope.state = "login";
    $scope.Pro = [];

    Products.getAll(function(data){
      $scope.products = data;
    });

    $scope.editProduct = function(product) {
      Products.editProduct(product, function(data){
      });
    };

    $scope.deleteProduct = function(_id){
      Products.deleteProduct(_id, function(data){
        Products.getAll(function(data){
          $scope.products = data;
        });
      });
    };

    $scope.addProduct = function(inputProduct,inputPrice) {
      Products.addProduct(inputProduct,inputPrice,localStorage.User, function(data){
        Products.getAll(function(data){
          $scope.products = data;
        });
      });
      $scope.inputProduct = '';
      $scope.inputPrice = '';
    };

    $scope.priceCal = function() {
      var sumPrices = 0;
      console.log($scope.products);
      for (var i = 0; i < $scope.products.length; i++) {
            //if($scope.products[i].done == 'true'){
            var product = $scope.products[i];
            if($scope.products[i].done == true)
             sumPrices += product.price * 1;
          //}
      }
      return sumPrices;
    };
    $scope.checkUser = function(inputUser,inputPassword) {
      Products.checkUser(inputUser,inputPassword, function(data) {
          $scope.Pro = data;
          console.log($scope.Pro[0].user);
          var p=data[0].user;
          localStorage.User= p;
      });
      $scope.state = "working";
    };
    $scope.changeState = function() {
      $scope.state = "register";
    };
    $scope.addUser = function(inputUser,inputPassword) {
        Products.addUser(inputUser,inputPassword, function(data) { 
    
        });
        $scope.state = "login"; 
    };
  }]);
