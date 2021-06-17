import { ApiService } from './../../../services/api.service';
import { Kategori } from './../../../models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soru } from 'src/app/models/Soru';

@Component({
  selector: 'app-makale-dialog',
  templateUrl: './makale-dialog.component.html',
  styleUrls: ['./makale-dialog.component.css'],
})
export class MakaleDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Soru;
  frm: FormGroup;
  kategoriler: Kategori[];
  Jconfig = {};
  constructor(
    public dialogRef: MatDialogRef<MakaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService
  ) {
    this.islem = data.islem;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Makale Ekle';
      this.yeniKayit = new Soru();
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Makale Düzenle';
      this.yeniKayit = data.kayit;
    }
    if (this.islem == 'detay') {
      this.dialogBaslik = 'Makale Detay';
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }

  FormOlustur() {
    return this.frmBuild.group({
      Baslik: [this.yeniKayit.baslik],
      KategoriId: [this.yeniKayit.katId],
      Icerik: [this.yeniKayit.icerik],
    });
  }
}
