(function () {

    var
        PanelView = function (options) {
            this.el    = options.el;
            this.model = options.model;
        },
        DocModel = function (options) {
            this.recordId = options.recordId;
            this.fileId = options.fileId;
        },
        AppView = function() {
            this.recordId1 = null;
            this.recordId2 = null;
            this.action = null;

            this.initialize = function() {
                this.determineParams();
                this.initPanelViews();
            };

            this.determineParams = function () {
                var pathdump = window.location.pathname.replace(/^\/?|\/?$/, "")
                                .split('/')
                                .splice(1, 3);

                this.recordId1    = pathdump[0];
                this.recordId2    = pathdump[1];
                this.action = (pathdump.length == 3) ? pathdump[2] : 'write';
            };

            this.initPanelViews = function () {
                var
                    model1 = new DocModel({
                        this.recordId1
                    }),
                    model2 = new DocModel({
                        this.recordId2
                    });

                var rightPanel = new PanelView({
                        el: document.getElementById('right-panel'),
                        model: model2
                    }),
                    leftPanel = new PanelView({
                        el: document.getElementById('left-panel'),
                        model: model1
                    });
            };

            this.initialize();
        };

    window.onload = function () {
        var appView = new AppView();
    };
})();