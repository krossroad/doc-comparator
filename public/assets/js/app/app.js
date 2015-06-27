(function (helper, undefined) {
    var
        PaginationView = function (options) {
            this.el = options.el;
            this.totalDoc = null;
            this.currentPage = null;

            this.setTotalDoc = function (totalDoc) {
                this.totalDoc = totalDoc;
                return this;
            };

            this.setCurrentPage = function (currentPage) {
                this.currentPage = currentPage;
                return this;
            }

            this.on = this.el.addEventListener.bind(this.el);
            this.removeEvent = this.el.removeEventListener.bind(this.el);
            this.trigger = function (eventName) {
                var event, args;

                args = [].slice.call(arguments, 1);
                event = new CustomEvent(eventName, {
                    detail: args
                });
                return this.el.dispatchEvent(event)
            };

            this.initialize = function() {
                var
                    self = this,
                    _update = helper.bind(this.update, this),
                    prevButton = this.el.getElementsByClassName('pg-previous')[0],
                    nextButton = this.el.getElementsByClassName('pg-next')[0];

                nextButton.addEventListener('click', function () {
                    self.trigger('pagination.next_page');
                });

                prevButton.addEventListener('click', function () {
                    self.trigger('pagination.prev_page');
                });

                this.on('pagination.update',  _update);
            };

            this.render = function () {
                var
                    markup = this.el.getElementsByClassName('pg-current-page')[0];

                markup.innerHTML = this.currentPage
            };

            this.update = function(e) {
                console.log(e);
                this.setCurrentPage(e.detail[0].currentPage)
                    .render();
            };

            this.initialize();
        };

    var
        PanelView = function (options) {
            this.el    = options.el;
            this.model = options.model;


            this.initialize = function () {
                this.bindings();
            };

            this.bindings = function () {
                var
                    self       = this,
                    saveButton = this.el.getElementsByClassName('save-doc')[0],
                    paginationContainer = this.el
                                        .getElementsByClassName('pagination-wrapper')[0],

                    _saveFileContent   = helper.bind(this.saveFileContent, this),
                    _clickNextPage     = helper.bind(this.clickNextPage, this),
                    _populateText      = helper.bind(this.populateText, this),
                    _clickPreviousPage = helper.bind(this.clickPreviousPage, this);

                this.paginationView = new PaginationView({
                    el: paginationContainer
                });

                this.paginationView.on('pagination.next_page', _clickNextPage);
                this.paginationView.on('pagination.prev_page', _clickPreviousPage);

                this.model
                    .fetchPaginationDetail(function(paginationDetail) {
                        self.paginationView
                            .trigger('pagination.update', {
                                currentPage: self.model.fileId
                            });
                    });
                this.model
                    .fetchFileContent(_populateText);

                if (saveButton) {
                    saveButton.addEventListener('click', _saveFileContent, false);
                }
            };


            this.saveFileContent = function () {
                var
                    newContent = this.textPanel.getHTML();

                this.model
                    .putFileContent(newContent);
            };

            this.clickNextPage = function () {
                var
                    prevFile = this.model.fileId + 1, f;

                f = fetchAndPoulateFileContent.bind(this);

                f(prevFile);
            };

            this.clickPreviousPage = function () {
                var
                    prevFile = this.model.fileId - 1, f;

                f = fetchAndPoulateFileContent.bind(this);

                f(prevFile);
            };

            var fetchAndPoulateFileContent  = function (fileId) {
                if (fileId > this.model.paginationDetail.total_documents || fileId <= 0) {
                    return false;
                }

                var
                    _populateText = helper.bind(this.populateText, this);

                this.model.setFileId(fileId)
                    .fetchFileContent(_populateText);

                this.paginationView.trigger('pagination.update', {
                    currentPage: this.model.fileId
                });
            };

            this.bindQuill = function () {
                var
                    textPanel = this.el.getElementsByClassName('panel-text-view')[0],
                    toolbar = this.el.getElementsByClassName('toolbar')[0];

                    this.textPanel = new Quill(textPanel, {
                        theme: 'snow'
                    });

                    if (toolbar) {
                        this.textPanel.addModule('toolbar', {
                            container: toolbar
                        });
                    }
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