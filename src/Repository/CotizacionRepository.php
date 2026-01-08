<?php

namespace App\Repository;

use App\Entity\Cotizacion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Cotizacion>
 */
class CotizacionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cotizacion::class);
    }

    //    /**
    //     * @return Cotizacion[] Returns an array of Cotizacion objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Cotizacion
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }


    /* esta funcion permite consultar las tazas aplicadas a una cotizacion
    devuelve un arreglo de 4 elementos
    ['tasaAplicada'=1,'tasa1'=>EUR,'tasa2'=>USD,'tasa3'=>0.00]
    */

    public function searchTasaCotizacion (int $idCotizacion) : array {
        /*$conn = $this->getEntityManager()->getConnection();
        $sql =  'select taza_aplicada,taza1,taza2,taza3 from mygraph.detalle_cotizacion where cotizacion_id=:idCotizacion limit 1';
        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery(['idCotizacion' => $idCotizacion]);
        // returns an array of arrays (i.e. a raw data set)
        return $resultSet->fetchAssociative();    */
        
        
        $conn = $this->getEntityManager()->getConnection();

        // Asegúrate de que los nombres de las columnas (taza vs tasa) 
        // sean idénticos a los de tu base de datos
        $sql = 'SELECT taza_aplicada, taza1, taza2, taza3 
                FROM detalle_cotizacion 
                WHERE cotizacion_id = :idCotizacion 
                LIMIT 1';

        // En DBAL 3.x es preferible ejecutar directamente desde la conexión
        $result = $conn->executeQuery($sql, ['idCotizacion' => $idCotizacion]);

        // fetchAssociative devuelve un array simple: ['taza_aplicada' => 1, ...]
        $data = $result->fetchAssociative();

        return $data ?: []; // Retorna el array o un array vacío si no hay datos        
    }
}
