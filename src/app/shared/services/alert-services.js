(function () {
    'use strict';
    function AlertService(swal) {
        /**
         * Displays warning message with title as "Are you sure?"
         * @param {*string} message which will be desplayed as warning message.
         */
        function basicWarningAlert(message) {
            return swal({
                title: "Are you sure?",
                text: message,
                type: "warning",
                showCancelButton: true,
                focusCancel: true,
                confirmButtonText: "Confirm"
            }).catch(swal.noop);
        }

        this.basicWarningAlert = basicWarningAlert;
    }

    angular
        .module('app')
        .service('alertService', AlertService);

    AlertService.$inject = ['swal'];
})();