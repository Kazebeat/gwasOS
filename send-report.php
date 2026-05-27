<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

<<<<<<< HEAD
$apiKey = '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';   // Make sure this is filled
=======
$apiKey = 'my-api-key';   // Make sure this is filled
>>>>>>> 503a40f35ff3a3a4b7bc2a4e1f443c41d62eadb1

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = trim($data['email'] ?? '');

    if (empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'No email provided']);
        exit;
    }

    $payload = [
        'sender' => ['name' => 'Kazebeat', 'email' => 'noreply@kazebeat.com'],
        'to' => [['email' => $email]],
        'subject' => 'Your Free Anyone Protocol Research Report',
        'htmlContent' => '<h2>Thank you!</h2><p>Your report is attached.</p>',
        'attachment' => [
            ['url' => 'https://kazebeat.com/reports/anyone-protocol-research.pdf', 'name' => 'Anyone-Protocol-Research-Report.pdf']
        ]
    ];

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/json',
        'api-key: ' . $apiKey
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode([
            'status' => 'error',
            'http_code' => $httpCode,
            'error' => $error,
            'response' => $response
        ]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
<<<<<<< HEAD
?>
=======
?>
>>>>>>> 503a40f35ff3a3a4b7bc2a4e1f443c41d62eadb1
