package org.goinf.repository;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import org.goinf.model.Cliente;

@RepositoryRestResource(collectionResourceRel = "clientes", path = "clientes", exported = true)
public interface ClienteRepository extends  JpaSpecificationExecutor<Cliente>, PagingAndSortingRepository<Cliente, Long> {


	@Override
	@PreAuthorize("hasRole('ROLE_MANAGER')")
	void delete(@Param("cliente") Cliente cliente);
	
	@PreAuthorize("hasRole('ROLE_MANAGER')")
    @Override
    List<Cliente> findAll();

    List<Cliente> findBycnpj(@Param("cnpj") String cnpj);
        
    Iterable<Cliente> findByNomeContainingIgnoreCase(@Param("nome") String nome);
    
    Iterable<Cliente> findByStatusContainingIgnoreCase(@Param("status") String status);

    Iterable<Cliente> findByNomeRepresentanteContainingIgnoreCase(@Param("nomeRepresentante") String nomeRepresentante);
	
	@Query("SELECT u FROM Cliente u WHERE u.id = :id ")
	Cliente findClienteById(@Param("id") Long id);
    
    @Query(value = "SELECT e FROM Cliente e")
	@PreAuthorize("hasRole('ROLE_MANAGER')")
    List<Cliente> findAllUsers();
       
	
	
}
