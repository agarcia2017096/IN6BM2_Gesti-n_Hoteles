import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    UsuarioService,

  ],
})
export class NavbarComponent implements OnInit {

  constructor(    public _usuarioService: UsuarioService,    public _activatedRoute: ActivatedRoute,

    ) { }

    public idHotel
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idHotel = dataRuta.get("idHotel");

    });
  }

}
