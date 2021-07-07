package br.jus.tjgo.litigantes.repository;


import br.jus.tjgo.litigantes.model.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;




/**
 * @author Lucas Soares
 */
@RepositoryRestResource(collectionResourceRel = "servicos", path = "servicos", exported = true)
public interface ServicoRepository extends  JpaSpecificationExecutor<Servico>, PagingAndSortingRepository<Servico, Long> {


	Servico save(Servico servico);

	Servico findByName(String name);

	@Query("SELECT u FROM Servico u WHERE u.id = :id ")
	Servico findServicoById(@Param("id") Long id);


}