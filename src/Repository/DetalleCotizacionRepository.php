<?php

namespace App\Repository;

use App\Entity\DetalleCotizacion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DetalleCotizacion>
 */
class DetalleCotizacionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DetalleCotizacion::class);
    }

    //    /**
    //     * @return DetalleCotizacion[] Returns an array of DetalleCotizacion objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('d')
    //            ->andWhere('d.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('d.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?DetalleCotizacion
    //    {
    //        return $this->createQueryBuilder('d')
    //            ->andWhere('d.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function searchDetallesCotizacion (int $idCotizacion) : array {
        /*$conn = $this->getEntityManager()->getConnection();
        $sql =  'select taza_aplicada,taza1,taza2,taza3 from mygraph.detalle_cotizacion where cotizacion_id=:idCotizacion limit 1';
        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery(['idCotizacion' => $idCotizacion]);
        // returns an array of arrays (i.e. a raw data set)
        return $resultSet->fetchAssociative();    */
        
        
        $conn = $this->getEntityManager()->getConnection();

        // Asegúrate de que los nombres de las columnas (taza vs tasa) 
        // sean idénticos a los de tu base de datos
        $sql = 'select 
        cotizacion.id,
        cotizacion.fecha_creacion,
        cotizacion.fecha_aprobacion,
        cotizacion.fecha_actualizacion,
        cotizacion.por_descuento,
        cotizacion.monto_descuento,
        detalle_cotizacion.id as id_detalle,
        detalle_cotizacion.cantidad,
        detalle_cotizacion.costo,
        detalle_cotizacion.precio,
        detalle_cotizacion.unidad_id,
        detalle_cotizacion.taza_aplicada,
        detalle_cotizacion.taza1,
        detalle_cotizacion.taza2,
        detalle_cotizacion.taza3,
        detalle_cotizacion.factor,
        detalle_cotizacion.porcentaje,
        detalle_cotizacion.orden,
        inventario.codigo,
        inventario.nombre,
        inventario.modelo,
        inventario.estado,
        unidad.simbolo
        from mygraph.cotizacion
        inner join mygraph.detalle_cotizacion 
        on (cotizacion.id=detalle_cotizacion.cotizacion_id)
        inner join mygraph.inventario
        on (detalle_cotizacion.inventario_id=inventario.id)
        inner join mygraph.unidad
        on (unidad.id=inventario.unidad_id)
        where cotizacion.id=:idCotizacion
        order by orden';

        // En DBAL 3.x es preferible ejecutar directamente desde la conexión
        $result = $conn->executeQuery($sql, ['idCotizacion' => $idCotizacion]);

        // fetchAssociative devuelve un array simple: ['taza_aplicada' => 1, ...]
        $data = $result->fetchAllAssociative();

        return $data ?: []; // Retorna el array o un array vacío si no hay datos        
    }    
}
