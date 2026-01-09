<?php

namespace App\Pdf;

use FPDF;

// 1. Extender la clase FPDF
class CustomPdf extends FPDF{
    private $userFullName;
    private $dateFormatted;

    // 1. Define el constructor para aceptar los datos
    public function __construct($orientation = 'P', $unit = 'mm', $size = 'A4', $userFullName, $dateFormatted)
    {
        parent::__construct($orientation, $unit, $size);
        
        // 2. Almacena los datos
        $this->userFullName = $userFullName;
        $this->dateFormatted = $dateFormatted;
    }

    // Método que FPDF llama automáticamente para dibujar el pie de página
    function Footer()
    {
        // ... (Tu código de configuración de posición, fuente, color) ...
        $this->SetY(-15);
        $this->SetFont('Arial', '', 8);
        $this->SetTextColor(128, 128, 128);

        // 3. Usa los datos almacenados
        $textFooter1 = 'Impresiones a tu medida';
        
        // 4. Incorpora el nombre del usuario y la fecha/hora en el texto
        $textFooter2 = sprintf(
            "Generado por: %s el %s Pagina %s de {nb}", 
            $this->userFullName, 
            $this->dateFormatted, 
            $this->PageNo()
        );
        
        // Primera línea (centrada)
        $this->Cell(0, 5, $textFooter1, 0, 1, 'C'); 
        
        // Segunda línea (centrada, 5mm más abajo)
        $this->Cell(0, 5, $textFooter2, 0, 0, 'C'); 
    }
}