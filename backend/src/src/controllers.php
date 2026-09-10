<?php

require_once __DIR__ . '/services.php';

function respond(array $result): void
{
    http_response_code($result['status']);

    if (isset($result['error'])) {
        echo json_encode(['error' => $result['error']]);
    } else {
        echo json_encode($result['data']); 
    }
}

function handleGet(): void
{
    try {
        echo json_encode(getAllUsers());
    } catch (\throwable $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);
    }
}