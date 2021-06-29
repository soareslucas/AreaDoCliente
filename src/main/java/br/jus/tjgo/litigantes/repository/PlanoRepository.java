package br.jus.tjgo.litigantes.repository;


import br.jus.tjgo.litigantes.model.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;



/**
 * @author Lucas Soares
 */
@RepositoryRestResource(collectionResourceRel = "planos", path = "planos", exported = true)
public interface PlanoRepository extends  JpaSpecificationExecutor<Plano>, PagingAndSortingRepository<Plano, Long> {


	Plano save(Plano plano);

	Plano findByName(String name);

}