package org.goinf.controller;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import org.goinf.model.Usuario;
import org.goinf.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Controller
public class UsuarioController {
	
	
	@Autowired
    private UsuarioRepository usuarioRepository;

	

    
    @RequestMapping(value = "changeUsuario", method = RequestMethod.POST)
    @ResponseBody
    public String changeUsuario(@PathVariable String id) {
        Usuario usuario = usuarioRepository.findUsuarioById(Long.parseLong(id));
        		
        return "{\"propriedade\": \"ok\"}";

    }

}
