<?php
$data = file_get_contents('php://input');
if ($data) {
    file_put_contents('data/collapses.json', $data);
    echo "Дані успішно збережено!";
} else {
    echo "Помилка при збереженні даних!";
}
?>
