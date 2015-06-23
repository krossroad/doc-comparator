<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * ComparatorController
 */
class ComparatorController extends BaseController
{
    public function indexAction($record_id1, $record_id2, $action = 'write')
    {
        return view('app.index')
                ->with('action', $action);
    }
}
