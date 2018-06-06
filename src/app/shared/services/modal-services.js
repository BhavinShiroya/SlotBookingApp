(function () {
    'use strict';

    /**
     * Service to be used to show modal dialog
    */
    function ModalService($uibModal) {

        /**
         * Opens dialog box using uibModal
         * @param {*string} templateUrl template url for modal dialog
         * @param {*} controller which is atteched to the template
         * @param {*} controllerAs which is used as an alias of a controller
         * @param {*} size of the modal (sm, md, lg)
         * @param {*} resolver to provide injection in controller
         */
        function openModal(templateUrl, controller, controllerAs, size, resolver) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                keyboard: 'true',
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: controllerAs,
                size: size,
                resolve: resolver
            });

            // modalInstance.opened.then(function () {
            //     //$('html').css({height: 'auto'});
            // });

            // modalInstance.closed.then(function () {
            //     $('html').css({
            //         height: 'auto'
            //     });
            //     $('html').css({
            //         height: '100%'
            //     });
            // });

            return modalInstance;
        }
        this.openModal = openModal;
    }
    angular
        .module('app')
        .service('ModalService', ModalService);

    ModalService.$inject = ['$uibModal'];
})();