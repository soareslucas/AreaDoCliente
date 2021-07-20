package br.jus.tjgo.litigantes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.repository.*;
import br.jus.tjgo.litigantes.model.*;


@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService  {

	private final UsuarioRepository usuarioRepository;

	@Autowired
	public SpringDataJpaUserDetailsService(UsuarioRepository repository) {
		this.usuarioRepository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		Usuario usuario = this.usuarioRepository.findByName(name);
		return new User(usuario.getName(), usuario.getPassword(), AuthorityUtils.createAuthorityList(usuario.getRoles()));
	}



}