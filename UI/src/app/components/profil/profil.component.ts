import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  uid: string;
  uye: Uye = new Uye();
  sorular: Soru[] = [];
  frm: FormGroup;
  guncellenecekUye: Uye = new Uye();

  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public frmBuild: FormBuilder
  ) {
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.uid = id;
    });
    this.profilListele();
    this.KullanicininSorulariniGetir();
  }

  KullanicininSorulariniGetir() {
    this.apiServis
      .SoruListeByUyeId(this.uid)
      .subscribe((data: Soru[]) => (this.sorular = data));
  }

  profilListele() {
    this.apiServis.UyeById(this.uid).subscribe((profil: Uye) => {
      this.uye = profil;
      this.guncellenecekUye = profil;
      console.log(this.uye);
    });
  }

  FormOlustur() {
    return this.frmBuild.group({
      ad: [this.guncellenecekUye.ad],
      soyad: [this.guncellenecekUye.soyad],
      eposta: [this.guncellenecekUye.email],
    });
  }

  ProfiliGuncelle() {
    this.guncellenecekUye.email =
      this.frm.value.eposta || this.guncellenecekUye.email;
    this.guncellenecekUye.ad = this.frm.value.ad || this.guncellenecekUye.ad;
    this.guncellenecekUye.soyad =
      this.frm.value.soyad || this.guncellenecekUye.soyad;

    this.apiServis
      .UyeDuzenle({
        userId: this.guncellenecekUye.userId,
        ad: this.guncellenecekUye.ad,
        soyad: this.guncellenecekUye.soyad,
        email: this.guncellenecekUye.email,
      })
      .subscribe();

    localStorage.setItem(
      'kadi',
      `${this.guncellenecekUye.ad} ${this.guncellenecekUye.soyad}`
    );

    location.reload();
  }
}
