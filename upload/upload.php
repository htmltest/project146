<?php
    $allowed = array('png', 'jpg', 'gif');

    if (isset($_FILES)) {
        foreach ($_FILES as $value) {
            if (!is_array($value['name'])) {
                $curFile = $value;
            } else {
                $curFile = array();
                foreach ($value['name'] as $subvalue) {
                    $curFile['name'] = $subvalue['avatar'];
                }
                foreach ($value['tmp_name'] as $subvalue) {
                    $curFile['tmp_name'] = $subvalue['avatar'];
                }
            }

            $extension = pathinfo($curFile['name'], PATHINFO_EXTENSION);

            if (!in_array(strtolower($extension), $allowed)) {
                echo '{"status":"error", "message":"Неверный формат файла (png, jpg, gif)"}';
                exit;
            }

            if (move_uploaded_file($curFile['tmp_name'], 'files/'.$curFile['name'])) {
                echo '{"status":"success", "path":"' . 'upload/files/'.$curFile['name'] . '"}';
                exit;
            }
        }
    }

    echo '{"status":"error", "message":"Ошибка загрузки файла на сервер"}';
    exit;
?>