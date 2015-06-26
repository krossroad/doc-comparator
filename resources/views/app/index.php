<!DOCTYPE html>
<html>
<head>
    <title>Comparator</title>
    <link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<?php echo url('assets/css/style.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo url('assets/css/quill.snow.css') ?>">

    <script type="text/javascript">
        var BaseConfig = {
            'baseUrl': "<?php echo url() ?>/"
        };
    </script>
</head>
<body>
    <div id="wrapper">
        <h2>Campare</h2>

        <div class="row">
            <div class="col-md-6 " id="left-panel" >
                <div class="pagination-wrapper">
                    <button class="pg-previous push_button blue">&lt;&lt;</button>
                    <div class="pg-current-page"></div>
                    <button class="pg-next push_button blue">&gt;&gt;</button>
                </div>

                <div class="quill-wrapper">
                    <?php if ($action == 'write'): ?>
                        <?php echo view('app.toolbar')->render(); ?>
                    <?php endif ?>

                    <div style="width: 100%; " class="panel-text-view" ></div>
                </div>
                <?php if ($action == 'write'): ?>
                    <button id="save-left-doc" class="save-doc push_button blue" >Save</button>
                <?php endif ?>
            </div>
            <div class="col-md-6" id="right-panel">

                <div class="pagination-wrapper">
                    <button class="pg-previous push_button blue">&lt;&lt;</button>
                    <div class="pg-current-page"></div>
                    <button class="pg-next push_button blue">&gt;&gt;</button>
                </div>

                <div class="quill-wrapper">
                    <?php if ($action == 'write'): ?>
                        <?php echo view('app.toolbar')->render() ?>
                    <?php endif ?>

                    <div style="width: 100%;" class="panel-text-view" ></div>
                </div>
                <?php if ($action == 'write'): ?>
                    <button id="save-right-doc" class="save-doc push_button blue">Save</button>
                <?php endif ?>
            </div>
        </div>
    </div>
    <footer>
        <script type="text/javascript" src="<?php echo url('assets/js/lib/quill.min.js') ?>"></script>
        <script type="text/javascript" src="<?php echo url('assets/js/app/helper.js') ?>"></script>
        <script type="text/javascript" src="<?php echo url('assets/js/app/app.js') ?>"></script>
    </footer>
</body>
</html>