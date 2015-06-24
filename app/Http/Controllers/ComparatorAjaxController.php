<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * ComparatorAjaxController
 */
class ComparatorAjaxController extends BaseController
{
    const DOC_EXT = '.txt';

    public function getIndexAction(Request $requet, $record_id, $doc_id)
    {

        $status = 'Failed';
        $fileContent = '';

        try {
            $fileContent = $this->getFileContent($record_id, $doc_id);
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
            $this->putFileContent($fileContent, $record_id, $doc_id);
        } catch (\Exception $e) {
        }
    }

    private function getFileContent($recordId, $docId)
    {
        $fullFilePath = storage_path() . "/documents/{$recordId}/{$docId}" . self::DOC_EXT;

        return file_get_contents($fullFilePath);
    }

    private function putFileContent($fileContent, $recordId, $docId)
    {
        $fullFilePath = storage_path() . "/documents/{$recordId}/{$docId}" . self::DOC_EXT;

        return file_put_contents($fullFilePath, $fileContent);
    }
}
