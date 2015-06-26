<?php namespace Comparator;

/**
 * FileHelper
 *
 * @package Comparator
 * @author Rikesh
 **/
class FileHelper
{
    const DOC_EXT = '.txt';

    public function getFileContent($recordId, $docId)
    {
        $fullFilePath = storage_path() . "/documents/{$recordId}/{$docId}" .
                            self::DOC_EXT;

        return file_get_contents($fullFilePath);
    }


    public function putFileContent($fileContent, $recordId, $docId)
    {
        $fullFilePath = storage_path() . "/documents/{$recordId}/{$docId}" .
                            self::DOC_EXT;

        return file_put_contents($fullFilePath, $fileContent);
    }

    public function getTotaliFilesInFolder($recordId)
    {
        $recordDir = storage_path() . "/documents/{$recordId}";

        $iterator = new \FilesystemIterator($recordDir, \FilesystemIterator::SKIP_DOTS);
        return iterator_count($iterator);
    }

    public function hasDocuments($recordId)
    {
        $recordDir = storage_path() . "/documents/{$recordId}";

        return (is_dir($recordDir) and
                    ($this->getTotaliFilesInFolder($recordId) > 0));
    }
}
// END class FileHelper
