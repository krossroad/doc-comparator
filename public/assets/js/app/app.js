(function (helper, undefined) {
    var
        PanelView = function (options) {
            this.el    = options.el;
            this.model = options.model;

            this.initialize = function () {
                this.bindings();
            };

            this.bindings = function () {
                var
                    _populateText = helper.bind(this.populateText, this);

                this.model
                    .fetchFileContent(_populateText);
            };

            this.bindQuill = function () {
                var
                    textPanel = (this.el.getElementsByClassName('panel-text-view')[0]);

                    this.textPanel = new Quill(textPanel, {
                        theme: 'snow'
                    });
            };

            this.populateText = function (fileContent) {
                var
                    textPanel = (this.el.getElementsByClassName('panel-text-view')[0]);

                textPanel.innerHTML = fileContent;

                this.bindQuill();
            };

            this.initialize();
        },

        DocModel = function (options) {
            this.fileId = 1; //Set Initial value to 1;
            this.recordId = options.recordId;
            this.paginationDetail = {}

            this.setFileId = function (fileId) {
                this.fileId = fileId;
                return this;
            };

            this.fetchPaginationDetail = function (callback) {
                var self = this;

                helper.ajax({
                    url: BaseConfig.baseUrl + 'comparator/ajax/' + this.recordId + '/pagination',
                    success: function (resp) {
                        try {
                            resp = JSON.parse(resp);
                            self.paginationDetail = resp.pagination

                            if (callback) {
                                callback(resp.pagination);
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }
                });
            };

            this.fetchFileContent = function (callback) {
                var self = this;

                helper.ajax({
                    url: BaseConfig.baseUrl + 'comparator/ajax/' + this.recordId + '/' + this.fileId,
                    success: function (resp) {
                        try {
                            resp = JSON.parse(resp);
                            callback(resp.file_content);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                });
            };

            this.putFileContent = function  (newContent) {
                helper.ajax({
                    url: BaseConfig.baseUrl + 'comparator/ajax/' + this.recordId + '/' + this.fileId,
                    type: 'POST',
                    data: {
                        file_content: newContent
                    },
                    success: function (resp) {
                    }
                })
            };
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
                        recordId: this.recordId1
                    }),
                    model2 = new DocModel({
                        recordId: this.recordId2
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
})(_AppHelper);