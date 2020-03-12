<?php
    $allowed = array('png', 'jpg', 'gif');

    if (isset($_FILES)) {
        foreach ($_FILES as $value) {
            $extension = pathinfo($value['name'], PATHINFO_EXTENSION);

            if (!in_array(strtolower($extension), $allowed)) {
                echo '{"status":"error", "message":"Неверный формат файла (png, jpg, gif)"}';
                exit;
            }

            if (move_uploaded_file($value['tmp_name'], 'files/'.$value['name'])) {
                echo '{"status":"success", "path":"' . 'upload/files/'.$value['name'] . '"}';
                exit;
            }
        }
    }

    echo '{"status":"error", "message":"Ошибка загрузки файла на сервер"}';
    exit;
?>