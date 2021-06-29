package br.jus.tjgo.litigantes.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;


import lombok.Data;

@Data
@Entity
public class Pagamento {

	private @Id @GeneratedValue Long id;

	private String name;
	private Date data;
	private Long valor;
	private boolean pago;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="plano_id")
	private Plano plano;


	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cliente_id")
	private Cliente cliente;


	public Pagamento() {}

	public Pagamento(String name, Date data, Long valor, boolean pago, Plano plano, Cliente cliente) {
		this.name = name;
		this.data = data;
		this.valor = valor;
		this.pago = pago;
		this.plano = plano;
		this.cliente = cliente;


	}
	

}