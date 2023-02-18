<?php
class VilRules {
	private $host;
	private $user;
	private $pass;

	public function __construct($host=VIL_RULES_API_URL, $user=VIL_RULES_API_USER, $pass=VIL_RULES_API_PASS) {
		$this->host = $host;
		$this->user = $user;
		$this->pass = $pass;
	}

	/* Raw curl API */
	private function curlGet($url, $params=array()) {
		$ch = curl_init();
		if (sizeof($params)) {
			$url .= "?" . http_build_query($params);
		}
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		if ($this->user && $this->pass) {
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.":".$this->pass);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		}
		$output = curl_exec($ch);
		curl_close($ch);

		return $output;
	}
	private function curlPut($url, $params=array()) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");

		//set the content type to application/json
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params, JSON_PRETTY_PRINT));
		if ($this->user && $this->pass) {
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.":".$this->pass);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		}
		$output = curl_exec($ch);
		curl_close($ch);

		return $output;
	}

	private function curlDelete($url, $params=array()) {
		$ch = curl_init();

		if (sizeof($params)) {
			$url .= "?" . http_build_query($params);
		}
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
		if ($this->user && $this->pass) {
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.":".$this->pass);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		}
		$output = curl_exec($ch);
		curl_close($ch);

		return $output;
	}

	private function curlPost($url, $params=array()) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

		//set the content type to application/json
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params, JSON_PRETTY_PRINT));
		if ($this->user && $this->pass) {
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.":".$this->pass);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		}
		$output = curl_exec($ch);
		curl_close($ch);

		return $output;
	}

	private function curlPostRaw($url, $params=array()) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		if ($this->user && $this->pass) {
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.":".$this->pass);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		}
		$output = curl_exec($ch);
		curl_close($ch);

		return $output;
	}

	private function vilRulesPost($function, $params=array()) {
		return $this->curlPost($this->host . $function, $params);
	}

	public function evaluate($params) {
		$requiredFields = array(
			"woonplaats",
			"leeftijd",
			"ouder-dan-21",
			"alleenstaande",
			"thuiswonende-kinderen",
			"inkomen-per-maand",
			"vermogen"
		);

		foreach ($requiredFields as $field) {
			if (!isset($params[$field])) {
				throw new Exception("Missing required field $field");
			}
		}

		$payload = array(
			"variables" => array(
				"Woonplaats" => array(
					"value" => $params['woonplaats'],
					"type" => "String"
				),
				"leeftijd" => array(
					"value" => (int)$params['leeftijd'],
					"type" => "Integer"
				),
				"ouderDan21" => array(
					"value" => ($params['ouder-dan-21'] === "true"),
					"type" => "Boolean"
				),
				"alleenstaande" => array(
					"value" => ($params['alleenstaande'] === "true"),
					"type" => "Boolean"
				),
				"thuiswonendeKinderen" => array(
					"value" => ($params['thuiswonende-kinderen'] === "true"),
					"type" => "Boolean"
				),
				"inkomenPerMaand" => array(
					"value" => (int)$params['inkomen-per-maand'],
					"type" => "Integer"
				),
				"vermogen" => array(
					"value" => (int)$params['vermogen'],
					"type" => "Integer"
				)
			)
		);

		$result = $this->vilRulesPost("evaluate", $payload);
		$result = json_decode($result, true);
		return $result[0]['residentApplication']['value'];
	}
}