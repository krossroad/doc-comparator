(function () {

    var AppView = function() {
        this.recordId1 = null;
        this.recordId2 = null;
        this.action = null;

        this.initialize = function() {
            this.determineParams();
        };

        this.determineParams = function () {
            var pathdump = window.location.pathname.replace(/^\/?|\/?$/, "")
                            .split('/')
                            .splice(1, 3);

            this.recordId1    = pathdump[0];
            this.recordId2    = pathdump[1];
            this.action = (pathdump.length == 3) ? pathdump[2] : 'write';
        };

        this.initialize();
    };

    window.onload = function () {
        var appView = new AppView();
    };
})();