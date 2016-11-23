(function() {
    'use strict';

    angular
        .module('app')
        .controller('OpenWeatherMap', OpenWeatherMap);

    OpenWeatherMap.$inject = ['$http', 'toastr'];

    /* @ngInject */
    function OpenWeatherMap($http, toastr) {
        var vm = this;

        vm.callWeatherMapApi = callWeatherMapApi;

        vm.history = [];

        ////////////////


        function callWeatherMapApi(cityname) {
            $http
                .get('http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&units=imperial&APPID=15b817be8b53e26368452b6ba3ca196e')
                .then(function(response) {
                    toastr.success('Success', 'Yay!');
                    vm.data = response.data;
                    vm.nowDate = new Date(new Date().getTime()).toLocaleDateString();
                    vm.nowTime = new Date(new Date().getTime()).toLocaleTimeString();
                    vm.history.push({ name: vm.data.name, date: vm.nowDate, time: vm.nowTime });

                })
                .catch(function(error) {
                    toastr.error('An error occured', 'NOPE!');
                });
            document.getElementById('hide').style.visibility = 'visible';
        }
    }
})();
