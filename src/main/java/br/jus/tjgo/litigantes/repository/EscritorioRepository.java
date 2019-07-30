package br.jus.tjgo.litigantes.repository;


import org.springframework.data.repository.PagingAndSortingRepository;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import br.jus.tjgo.litigantes.model.Escritorio;
/**
 * @author 
 */
@RepositoryRestResource(collectionResourceRel = "escritorios", path = "escritorios")
public interface EscritorioRepository extends PagingAndSortingRepository<Escritorio, Long> {

	@Override
	@PreAuthorize("hasRole('ROLE_MANAGER')")
	void deleteById(@Param("id") Long id);

	@Override
	@PreAuthorize("hasRole('ROLE_MANAGER')")
	void delete(@Param("escritorio") Escritorio escritorio);
	
	
    /**
     * Método que retorna uma lista de Escritorios fazendo a busca pelo nome 
     passado como parâmetro.
     *  
     * @param name
     * @return lista de Escritorios
     */
    List<Escritorio> findBycnpj(@Param("cnpj") String cnpj);
     
    /**
     * Método que retorna o Escritorio com apenas seu nome fazendo a busca 
     com o id passado como parâmetro.
     * 
     * @param id
     * @return Escritorio do id passado como parâmetro.
     */  
    @Query("SELECT e.cnpj FROM Escritorio e where e.id = :id") 
    Escritorio findCNPJById(@Param("id") Long id);
     
    /**
     * Método que retorna uma lista de clientes fazendo a busca pelo nome passado 
     como parâmetro e ordenando os 
     * clientes pelo nome.
     *  
     * @param name
     * @return lista de Escritorios
     */
    List<Escritorio> findByNomeOrderByNome(@Param("nome") String nome);
	
	
	
}
