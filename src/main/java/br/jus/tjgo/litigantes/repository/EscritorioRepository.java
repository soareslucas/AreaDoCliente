package br.jus.tjgo.litigantes.repository;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;


import br.jus.tjgo.litigantes.model.Escritorio;

@RepositoryRestResource(collectionResourceRel = "escritorios", path = "escritorios", exported = true)
public interface EscritorioRepository extends PagingAndSortingRepository<Escritorio, Long> {


	@Override
	@PreAuthorize("hasRole('ROLE_MANAGER')")
	void delete(@Param("escritorio") Escritorio escritorio);
	
	@PreAuthorize("hasRole('ROLE_MANAGER')")
    @Override
    List<Escritorio> findAll();

    List<Escritorio> findBycnpj(@Param("cnpj") String cnpj);
	
	@Query("SELECT u FROM Escritorio u WHERE u.id = :id ")
	Escritorio findEscritorioById(@Param("id") Long id);
    
    @Query(value = "SELECT e FROM Escritorio e")
	@PreAuthorize("hasRole('ROLE_MANAGER')")
    List<Escritorio> findAllUsers();
       
	
	
}
