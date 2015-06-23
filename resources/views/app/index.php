<!DOCTYPE html>
<html>
<head>
    <title>Comparator</title>
    <link rel="stylesheet" type="text/css" href="<?php echo url('assets/css/style.css') ?>">

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
            <div class="col-md-6 quill-wrapper" id="left-panel" >

                <?php echo view('app.toolbar')->render(); ?>

                <div style="width: 100%; " class="panel-text-view" ></div>
                <?php if ($action == 'write'): ?>
                    <button id="save-left-doc" class="save-doc" >Save</button>
                <?php endif ?>
            </div>
            <div class="col-md-6 quill-wrapper" id="right-panel">

                <?php echo view('app.toolbar')->render() ?>

                <div style="width: 100%;" class="panel-text-view" ></div>
                <?php if ($action == 'write'): ?>
                    <button id="save-right-doc" class="save-doc">Save</button>
                <?php endif ?>
            </div>
        </div>
    </div>
    <footer>
        <script type="text/javascript" src="<?php echo url('assets/js/app/app.js') ?>"></script>
    </footer>
</body>
</html>