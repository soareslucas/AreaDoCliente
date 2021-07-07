package br.jus.tjgo.litigantes.repository;


import br.jus.tjgo.litigantes.model.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;



/**
 * @author Lucas Soares
 */
@RepositoryRestResource(collectionResourceRel = "seguimentos", path = "seguimentos", exported = true)
public interface SeguimentoRepository extends  JpaSpecificationExecutor<Cliente>, PagingAndSortingRepository<Seguimento, Long> {


	Seguimento save(Seguimento seguimento);

	Seguimento findByName(String name);

}