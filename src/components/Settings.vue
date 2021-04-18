<template>
    <div>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary fixed-bottom ms-auto " style="margin-right: 10px;margin-bottom: 10px" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img
            src="https://img2.pngio.com/filewindows-settings-app-iconpng-wikimedia-commons-settings-icon-png-2295_2295.png"
            width="25"
            height="25"
        >
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Ayarlar</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <span v-if="cookie">
              <ul  class="list-group list-group-flush text-center">
                <li class="list-group-item">Ülke : {{ ulkeAdi }}</li>
                <li class="list-group-item">Şehir : {{ sehirAdi }}</li>
                <li class="list-group-item">İlçe : {{ ilceAdi }}</li>
              </ul>
              <center><button type="button" class="btn btn-info " data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#exampleModal2">
 Lokasyon Değiştir
      </button></center>
            </span>
              <span v-else class="form-group"><div v-if="errors && errors.length" class="alert alert-danger">
                  Günlük Sorgu Limitine Ulaştınız
                </div><form v-else onsubmit="return false">

              <label  class="form-label">Ülke Seçin</label>
              <select class="form-control"  @change="ulke($event)">
                <option  selected disabled hidden value="">Ülke Seçiniz</option>
                <option v-for="sehir in ulkeler" :key="sehir.UlkeID" :value="sehir.UlkeID">{{sehir.UlkeAdi}}</option>
              </select>
              <label  class="form-label">Şehir Seçin</label>
              <select class="form-control"  @change="il($event)">
                <option  selected disabled hidden value="">Şehir Seçiniz</option>
                <option v-for="sehir in sehirler" :key="sehir.SehirID" :value="sehir.SehirID">{{sehir.SehirAdi}}</option>
              </select>
              <label  class="form-label">İlçe Seçin</label>
              <select class="form-control"  v-if="ilceler" @change="ilce($event)">
                <option  selected disabled hidden value="">İlçe Seçiniz</option>
                <option v-for="ilce in ilceler" :key="ilce.IlceID" :value="ilce.IlceID">{{ilce.IlceAdi}}</option>
              </select>

            </form>
              </span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>

            </div>
          </div>
        </div>
      </div>
      <!--som -->
      <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">Lokasyon Seç</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="alert alert-danger" v-if="hata != false">{{hata}}</div>
              <div v-if="errors && errors.length" class="alert alert-danger">
                Günlük Sorgu Limitine Ulaştınız
              </div>
              <form v-else onsubmit="return false">

                <label  class="form-label">Ülke Seçin</label>
                <select class="form-control"  @change="ulke2($event)">
                  <option  selected disabled hidden value="">Ülke Seçiniz</option>
                  <option v-for="sehir in ulkeler" :key="sehir.UlkeID" :value="sehir.UlkeID">{{sehir.UlkeAdi}}</option>
                </select>
                <label  class="form-label">Şehir Seçin</label>
                <select class="form-control"  @change="il2($event)">
                  <option  selected disabled hidden value="">Şehir Seçiniz</option>
                  <option v-for="sehir in sehirler" :key="sehir.SehirID" :value="sehir.SehirID">{{sehir.SehirAdi}}</option>
                </select>
                <label  class="form-label">İlçe Seçin</label>
                <select class="form-control"  v-if="ilceler" @change="ilce2($event)">
                  <option  selected disabled hidden value="">İlçe Seçiniz</option>
                  <option v-for="ilce in ilceler" :key="ilce.IlceID" :value="ilce.IlceID">{{ilce.IlceAdi}}</option>
                </select>

              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
              <button type="button" class="btn btn-primary" @click="kaydet()" data-bs-dismiss="modal">Kaydet</button>
            </div>
          </div>
        </div>
      </div>
       </div>
</template>
<script>

import axios from "axios";

export default {
  name: 'Settings',
created() {
  this.getUlke();
    },
  data() {
    return {
      cookie:this.$cookies.isKey("IlceID"),
      ulkeAdi:null,
      sehirAdi:null,
      ilceAdi:null,
      ilceiD:null,
      ulkeAdi2:null,
      sehirAdi2:null,
      ilceAdi2:null,
      ilceiD2:null,
      posts: [],
      sehirler:[],
      ilceler:[],
      ulkeler:[],
      errors: [],
      hata:false

    };
  },
  methods:{
    checkCookie(){
      if (this.cookie == true){
        this.ulkeAdi = this.$cookies.get("Ulke");
        this.sehirAdi = this.$cookies.get("Sehir");
        this.ilceAdi = this.$cookies.get("Ilce");
        this.ilceiD = this.$cookies.get("IlceID");
      }else{
        this.cookie = false
      }
    },
    il(event){

        for(var i=0; i < this.sehirler.length; i++){
          if( this.sehirler[i].SehirID == event.target.value){
            this.sehirAdi = this.sehirler[i].SehirAdi;
            this.$cookies.set("Sehir",this.sehirAdi);
          }
        }

      this.getIlce(event.target.value);

    },
    ulke(event){
      for(var i=0; i < this.ulkeler.length; i++){
        if( this.ulkeler[i].UlkeID == event.target.value){
          this.ulkeAdi = this.ulkeler[i].UlkeAdi;
          this.$cookies.set("Ulke",this.ulkeAdi);
        }
      }
      this.getSehir(event.target.value)

    },
    ilce(event){
      for(var i=0; i < this.ilceler.length; i++){
        if( this.ilceler[i].IlceID == event.target.value){
          this.ilceAdi = this.ilceler[i].IlceAdi;
          this.$cookies.set("Ilce",this.ilceAdi);
        }
      }
      this.ilceiD = event.target.value;
      this.$cookies.set("IlceID",this.ilceiD);

    },
    il2(event){

      for(var i=0; i < this.sehirler.length; i++){
        if( this.sehirler[i].SehirID == event.target.value){
          this.sehirAdi2 = this.sehirler[i].SehirAdi;

        }
      }

      this.getIlce(event.target.value);

    },
    ulke2(event){
      for(var i=0; i < this.ulkeler.length; i++){
        if( this.ulkeler[i].UlkeID == event.target.value){
          this.ulkeAdi2 = this.ulkeler[i].UlkeAdi;

        }
      }
      this.getSehir(event.target.value)

    },
    ilce2(event){
      for(var i=0; i < this.ilceler.length; i++){
        if( this.ilceler[i].IlceID == event.target.value){
          this.ilceAdi2 = this.ilceler[i].IlceAdi;

        }
      }
      this.ilceiD = event.target.value;


    },
    kaydet(){
      if (this.ulkeAdi2 == null){
        this.hata = "Lütfen Ülke Seçiniz";
      }else if (this.sehirAdi2 == null){
        this.hata = "Lütfen Şehir Seçiniz";
      }else if (this.ilceAdi2 == null){
        this.hata = "Lütfen İlçe Seçiniz";
      }else{
        this.$cookies.remove("Ulke");
        this.$cookies.remove("Sehir");
        this.$cookies.remove("Ilce");
        this.$cookies.remove("IlceID");
        this.$cookies.set("Ulke",this.ulkeAdi2);
        this.$cookies.set("Sehir",this.sehirAdi2);
        this.$cookies.set("Ilce",this.ilceAdi2);
        this.$cookies.set("IlceID",this.ilceiD2);
      }
    },
    getIlce(id){
      axios.get("https://ezanvakti.herokuapp.com/ilceler/"+id).then(response => ( this.ilceler = response.data)).catch(error => {
        this.errors.push(error);
      });
    },
    getUlke() {
      axios.get("https://ezanvakti.herokuapp.com/ulkeler/").then(response => ( this.ulkeler = response.data)).catch(error => {
        this.errors.push(error);
      });
    },
    getSehir(id) {
      axios.get("https://ezanvakti.herokuapp.com/sehirler/"+id).then(response => ( this.sehirler = response.data)).catch(error => {
        this.errors.push(error);
      });
    }
  },
  mounted() {
    this.checkCookie()
  }
}
</script>