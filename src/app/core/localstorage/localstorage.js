(function () {
    'use strict';

    function LocalstorageCtrl($rootScope, $localStorage, ModalService) {
        var vm = this;
        $rootScope.settings.layout.pageHeader = true;
        $rootScope.settings.layout.pageHead = true;
        $rootScope.settings.layout.pageFooter = true;
        vm.timeSlots = [];
        if (!$localStorage.timeSlotsData) {
            $localStorage.timeSlotsData = [];
        }
        for (var i = 8; i <= 17; i++) {
            if (i >= 12) {
                if (i >= 13) {
                    generateArray((i - 12) + ' PM');
                } else {
                    generateArray(i + ' PM');
                }
            } else {
                generateArray(i + ' AM');
            }
        };

        function generateArray(sloatTime) {
            var data = {
                first_name: '',
                last_name: '',
                mobile: '',
                sloat_time: sloatTime,
                isBook: false,
            };
            vm.timeSlots.push(data);
        }

        loadAllSavedSlot();
        /**
         * load all slots form server
         */
        function loadAllSavedSlot() {
            angular.forEach(vm.timeSlots, function (localData) {
                angular.forEach($localStorage.timeSlotsData, function (serverData) {
                    if (localData.sloat_time === serverData.sloat_time) {
                        dataAssign(localData, serverData);
                    }
                });
            });
        }

        function dataAssign(localData, serverData) {
            localData.first_name = serverData.first_name;
            localData.last_name = serverData.last_name;
            localData.mobile = serverData.mobile;
            localData.isBook = serverData.isBook;
        }


        /**
         * 
         * @param {*object} slotDetails 
         */
        function openSloats(slotDetails, index) {
            var modalInstance = ModalService.openModal(
                "app/core/localstorage/modal-localstorage.html",
                "localstorageModalCtrl",
                "$ctrl",
                'md',
                {
                    slotData: function () {
                        return slotDetails
                    },
                    index: function () {
                        return index
                    }
                });
            modalInstance.result.then(function (result) {
                if (result) {
                    vm.timeSlots[result.index] = result.data;
                }
            });
        };
        // function dataAssign(localData, serverData) {
        //     localData.first_name = serverData.first_name;
        //     localData.last_name = serverData.last_name;
        //     localData.mobile = serverData.mobile;
        //     localData.isBook = serverData.isBook;
        // }

        vm.openSloats = openSloats;

    }
    angular
        .module('app')
        .controller('LocalstorageCtrl', LocalstorageCtrl);

    LocalstorageCtrl.$inject = ['$rootScope', '$localStorage', 'ModalService'];
})();