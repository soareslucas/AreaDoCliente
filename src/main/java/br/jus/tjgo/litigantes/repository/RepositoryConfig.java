package br.jus.tjgo.litigantes.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import br.jus.tjgo.litigantes.model.*;


@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Cliente.class);
        config.exposeIdsFor(Usuario.class);
        config.exposeIdsFor(Plano.class);
        config.exposeIdsFor(Seguimento.class);
        config.exposeIdsFor(Pagamento.class);
        config.exposeIdsFor(Servico.class);




    }
}