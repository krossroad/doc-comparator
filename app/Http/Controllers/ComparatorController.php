<?php

namespace App\Http\Controllers;

use Comparator\FileHelper;
use Comparator\Exceptions\DocumentNotFoundException;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * ComparatorController
 */
class ComparatorController extends BaseController
{
    /**
     * @var FileHelper
     */
    protected $fileHelper;

    public function __construct(FileHelper $fileHelper)
    {
        $this->fileHelper = $fileHelper;
    }

    public function indexAction($record_id1, $record_id2, $action = 'write')
    {
        if (! $this->fileHelper->hasDocuments($record_id1)) {
            throw new DocumentNotFoundException("Record for id " . $record_id1 . " not available!!");
        }
        if (! $this->fileHelper->hasDocuments($record_id2)) {
            throw new DocumentNotFoundException("Record for id " . $record_id2 . " not available!!");
        }
        return view('app.index')
                ->with('action', $action);
    }
}
