<?php
// send-report.php - Secure Brevo Proxy

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$apiKey = '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';   // ← Paste your full Brevo API key here

$payload = [
    'sender' => [
        'name' => 'Kazebeat',
        'email' => 'noreply@kazebeat.com'
    ],
    'to' => [
        ['email' => $email]
    ],
    'subject' => 'Your Free Anyone Protocol Research Report',
    'htmlContent' => '
        <h2>Thank you!</h2>
        <p>Your requested report is attached.</p>
        <p><strong>Anyone Protocol: Future-proofing Privacy</strong></p>
    ',
    'attachment' => [
        [
            'url' => 'https://kazebeat.com/reports/anyone-protocol-research.pdf',
            'name' => 'Anyone-Protocol-Research-Report.pdf'
        ]
    ]
];

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'api-key: ' . $apiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
