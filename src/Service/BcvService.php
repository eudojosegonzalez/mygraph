<?php

namespace App\Service;

use Exception;

class BcvService
{
    private const URL_BCV = 'https://www.bcv.org.ve/';

    public function getTasas(): array
    {
        $html = $this->fetchUrl(self::URL_BCV);
        
        return [
            'USD' => floatval(str_replace(",",".",$this->extraerTasa($html, 'dolar'))),
            'EUR' => floatval(str_replace(",",".",$this->extraerTasa($html, 'euro'))),
            'fecha' => $this->extraerFecha($html)
        ];
    }

    private function fetchUrl(string $url): string
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // El BCV a veces bloquea peticiones sin User-Agent
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        // Ignorar verificación de SSL si el servidor tiene certificados viejos
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            throw new Exception('Error cURL: ' . curl_error($ch));
        }

        curl_close($ch);
        return $response;
    }

    private function extraerTasa(string $html, string $id): ?float
    {
        $dom = new \DOMDocument();
        // Usamos @ para ignorar advertencias de HTML5 mal formateado
        @$dom->loadHTML($html);
        $xpath = new \DOMXPath($dom);

        // El BCV usa IDs como 'dolar' y 'euro' dentro de contenedores específicos
        $query = "//*[@id='$id']//strong";
        $nodes = $xpath->query($query);

        if ($nodes->length > 0) {
            $valor = trim($nodes->item(0)->nodeValue);
            // Convertimos formato 36,45 a 36.45
            return (float) str_replace(',', '.', $valor);
        }

        return null;
    }

    private function extraerFecha(string $html): string
    {
        $dom = new \DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new \DOMXPath($dom);
        
        // Extrae la fecha de vigencia que suele estar en la clase 'date-display-single'
        $node = $xpath->query("//span[@class='date-display-single']");
        return $node->length > 0 ? trim($node->item(0)->nodeValue) : date('Y-m-d');
    }
}