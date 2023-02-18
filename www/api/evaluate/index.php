<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	require_once('../../../lib/config.php');

	require_once('../../../lib/modules/config.php');
	require_once('../../../lib/modules/vilrules/vilrules.php');

	$request  = http::request();
	$requestTarget = $request['target'];
	$requestTarget = preg_replace("/^\/api/", "", $requestTarget);
	$path     = filesystem::path($requestTarget);
	$dirname  = dirname($path);
	$filename = basename($path);

	try {
		switch($request['method']) {
			case 'OPTIONS':
				output('ok',200);
			break;
			case 'POST':
			case 'PUT':
				$postData = json_decode(file_get_contents('php://input'), true);
				if (!is_array($postData)) {
					output('Not valid JSON', 409);
					return;
				}

				$vilRules = new vilRules();
				$result = $vilRules->evaluate($postData);
				output($result, 200);
			break;
			case 'GET':
			case 'DELETE':
				output('Not implemented', 501);
			break;
		}
	} catch( \Exception $e) {
		error($e);
	}

	function output($data, $status) {
		http::response($status, $data);		
	}

	function error($e) {
		output(["error" => $e->getCode(), "message" => $e->getMessage()], 501);		
	}

	function filenotfound($path) {
		output(["error" => 404, "message" => "File not found"], 404);
	}
