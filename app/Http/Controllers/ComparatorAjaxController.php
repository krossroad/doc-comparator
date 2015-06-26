<?php

namespace App\Http\Controllers;

use Comparator\FileHelper;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * ComparatorAjaxController
 */
class ComparatorAjaxController extends BaseController
{
    /**
     * @var FileHelper
     */
    protected $fileHelper;

    public function __construct(FileHelper $fileHelper)
    {
        $this->fileHelper = $fileHelper;
    }

    public function getIndexAction(Request $requet, $record_id, $doc_id)
    {
        $status = 'Failed';
        $fileContent = '';

        try {
            $fileContent = $this->fileHelper->getFileContent($record_id, $doc_id);
            $status = 'Ok';
        } catch (\Exception $e) {
        }

        return response()->json([
            'status' => 'Ok',
            'file_content' => $fileContent,
            'message' => ''
        ]);
    }

    public function postIndexAction(Request $request, $record_id, $doc_id)
    {
        $status = 'Failed';
        $message = '';
        $fileContent = $request->input('file_content');
        try {
            $this->fileHelper->putFileContent($fileContent, $record_id, $doc_id);
        } catch (\Exception $e) {
        }
    }

    public function getPaginationAction(Request $request, $recordId)
    {
        return response()->json([
            'status' => 'Ok',
            'pagination' => [
                'total_documents' => $this->fileHelper->getTotaliFilesInFolder($recordId)
            ]
        ]);
    }
}
