package org.goinf.repository;


import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.goinf.model.*;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



/**
 * @author Lucas Soares
 */
@RepositoryRestResource(exported = true)
public interface UsuarioRepository extends  JpaSpecificationExecutor<Usuario>, PagingAndSortingRepository<Usuario, Long> {


	Usuario save(Usuario usuario);

	Usuario findByName(String name);

	@Query("SELECT u FROM Usuario u WHERE u.id = :id ")
	Usuario findUsuarioById(@Param("id") Long id);

}