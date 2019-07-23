package br.jus.tjgo.litigantes;


import org.springframework.data.repository.PagingAndSortingRepository;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
/**
 * @author 
 */

@RepositoryRestResource(collectionResourceRel = "escritorios", path = "escritorios")
public interface EscritorioRepository extends PagingAndSortingRepository<Escritorio, Long> {

    /**
     * Método que retorna uma lista de clientes fazendo a busca pelo nome 
     passado como parâmetro.
     *  
     * @param name
     * @return lista de clientes
     */
    List<Escritorio> findBycnpj(@Param("cnpj") String cnpj);
     
    /**
     * Método que retorna o cliente com apenas seu nome fazendo a busca 
     com o id passado como parâmetro.
     * 
     * @param id
     * @return cliente do id passado como parâmetro.
     */  
    @Query("SELECT e.cnpj FROM Escritorio e where e.id = :id") 
    Escritorio findCNPJById(@Param("id") Long id);
     
    /**
     * Método que retorna uma lista de clientes fazendo a busca pelo nome passado 
     como parâmetro e ordenando os 
     * clientes pelo nome.
     *  
     * @param name
     * @return lista de Escritorio
     */
    List<Escritorio> findByNomeOrderByNome(@Param("nome") String nome);
	
	
	
}
