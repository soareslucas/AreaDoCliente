package br.jus.tjgo.litigantes.repository;


import br.jus.tjgo.litigantes.model.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;



/**
 * @author Lucas Soares
 */
@RepositoryRestResource(collectionResourceRel = "pagamentos", path = "pagamentos", exported = true)
public interface PagamentoRepository extends  JpaSpecificationExecutor<Cliente>, PagingAndSortingRepository<Pagamento, Long> {


	Pagamento save(Pagamento pagamento);

	Pagamento findByName(String name);

}