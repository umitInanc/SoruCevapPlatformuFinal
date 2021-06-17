import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-kayit-ol',
  templateUrl: './kayit-ol.component.html',
  styleUrls: ['./kayit-ol.component.css'],
})
export class KayitOlComponent implements OnInit {
  frm: FormGroup;
  uye: Uye = new Uye();

  constructor(
    public frmBuild: FormBuilder,
    private readonly apiServis: ApiService
  ) {
    this.frm = this.FormOlustur();
  }

  ngOnInit() {}

  FormOlustur() {
    return this.frmBuild.group({
      ad: [this.uye.ad],
      soyad: [this.uye.soyad],
      eposta: [this.uye.email],
      sifre: [this.uye.sifre],
    });
  }

  KayitOl() {
    this.uye.rol = 'Uye';
    this.uye.email = this.frm.value.eposta;
    this.uye.ad = this.frm.value.ad;
    this.uye.soyad = this.frm.value.soyad;
    this.uye.sifre = this.frm.value.sifre;

    this.apiServis.UyeEkle(this.uye).subscribe();
    location.replace("localhost:4200/login")
  }
}
