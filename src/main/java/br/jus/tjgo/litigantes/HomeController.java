package br.jus.tjgo.litigantes;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import br.jus.tjgo.litigantes.model.Escritorio;
import br.jus.tjgo.litigantes.repository.EscritorioRepository;

@Controller
public class HomeController {
	
	
	@Autowired
    private EscritorioRepository escritorioRepository;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
	
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    @ResponseBody
    @Transactional
    public String upload(HttpServletRequest request, @RequestParam MultipartFile file)  {
        
    	try {
            byte [] uploadedFiles = file.getBytes();
            
            System.out.println(file.getName());
            
            request.getSession().setAttribute("uploadedFiles", uploadedFiles);
            
        } catch (IOException e) {
            throw new RuntimeException("Can't read file " + file.getOriginalFilename(), e);
        }

        return "{\"propriedade\": \"ok\"}";
    }
    
    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        Escritorio escritorio = escritorioRepository.findEscritorioById(Long.valueOf(fileId));
        		
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "arquivo.pdf" + "\"")
                .body(new ByteArrayResource(escritorio.getData()));
    }

}
