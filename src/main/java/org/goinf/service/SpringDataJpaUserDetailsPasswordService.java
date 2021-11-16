package org.goinf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import org.goinf.model.*;
import org.goinf.repository.*;


@Component
public class SpringDataJpaUserDetailsPasswordService implements UserDetailsPasswordService  {

	private final UsuarioRepository usuarioRepository;

	@Autowired
	public SpringDataJpaUserDetailsPasswordService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}


	@Override
	public UserDetails updatePassword(UserDetails user, String newPassword) {

		System.out.println("entrou no update");

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		Usuario usuario = usuarioRepository.findByName(user.getUsername());

		if (!passwordEncoder.matches(newPassword, usuario.getPassword())){
			usuario.setPassword(newPassword);
		}
		

	 	 return new User(usuario.getName(), usuario.getPassword(), AuthorityUtils.createAuthorityList(usuario.getRoles()));
	}

}