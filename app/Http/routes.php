<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->welcome();
});


$app->get('/compare/{record_id1:[0-9]+}/{record_id2:[0-9]+}', function ($id1, $id2) use ($app) {
    $action = 'write';
    return redirect()->route('apphome', [
        'record_id1' => $id1,
        'record_id2' => $id2,
        'action' => $action,
    ]);
});
$app->get('/compare/{record_id1:[0-9]+}/{record_id2:[0-9]+}/{action:write|read}', [
    'uses' => 'ComparatorController@indexAction',
    'as' => 'apphome'
]);
