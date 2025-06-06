<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$SUPABASE_URL = "https://prfkhjuujnheztwhwmcd.supabase.co";
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZmtoanV1am5oZXp0d2h3bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDk2NjIsImV4cCI6MjA1NzM4NTY2Mn0.j92nEtB5mUORV5VlCpLsTbJNinSykjnpaX0R1cnZQXc";

function fetchFromSupabase($table, $query = '') {
    global $SUPABASE_URL, $SUPABASE_KEY;

    $url = "$SUPABASE_URL/rest/v1/$table$query";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $SUPABASE_KEY",
        "Authorization: Bearer $SUPABASE_KEY",
        "Content-Type: application/json"
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        http_response_code(500);
        echo json_encode(["error" => curl_error($ch)]);
        curl_close($ch);
        exit;
    }

    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status >= 200 && $status < 300) {
        echo $response;
    } else {
        http_response_code($status);
        echo json_encode(["error" => "Supabase error: $response"]);
    }
}

$request_uri = $_SERVER['REQUEST_URI'];

if (strpos($request_uri, '/publications') !== false) {
    fetchFromSupabase("publications", "?select=*&order=id.asc&limit=10");
}
else if (strpos($request_uri, '/projects') !== false) {
    fetchFromSupabase("projects", "?select=*");
}
else if (strpos($request_uri, '/collabs') !== false) {
    fetchFromSupabase("collabs", "?select=*");
}
else if (strpos($request_uri, '/team') !== false) {
    fetchFromSupabase("team", "?select=*");
}
else {
    http_response_code(404);
    echo json_encode(["error" => "Route not found"]);
}
?>
