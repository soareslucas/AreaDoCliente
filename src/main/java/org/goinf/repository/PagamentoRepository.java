package org.goinf.repository;


import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.goinf.model.*;

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