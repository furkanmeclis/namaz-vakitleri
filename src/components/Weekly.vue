<template>

<div class="container mt-3 mb-3">
  <div class=" table-responsive">
  <center><h1>Aylık Namaz Vakitleri</h1></center>
    <div v-if="errors && errors.length" class="alert alert-danger">
      Günlük Sorgu Limitine Ulaştınız
    </div>
    <table v-else class="table table-striped table-hover table-bordered">

      <thead>
      <tr class="table-warning">
        <th scope="col">Tarih</th>
        <th scope="col">İmsak</th>
        <th scope="col">Güneş</th>
        <th scope="col">Öğle</th>
        <th scope="col">İkindi</th>
        <th scope="col">Akşam</th>
        <th scope="col">Yatsı</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="post of posts.slice(0,7)" :key="post.MiladiTarihKisa">
        <td> <img :src="post.AyinSekliURL" width="20" height="20" :alt="post.MiladiTarihUzun"> | {{ post.MiladiTarihUzun }}</td>
        <td>{{ post.Imsak }}</td>
        <td>{{ post.Gunes }}</td>
        <td>{{ post.Ogle }}</td>
        <td>{{ post.Ikindi }}</td>
        <td>{{ post.Aksam }}</td>
        <td>{{ post.Yatsi }}</td>


      </tr>
      <tr class="table-warning">
        <th scope="col">Tarih</th>
        <th scope="col">İmsak</th>
        <th scope="col">Güneş</th>
        <th scope="col">Öğle</th>
        <th scope="col">İkindi</th>
        <th scope="col">Akşam</th>
        <th scope="col">Yatsı</th>

      </tr>
      <tr v-for="post of posts.slice(7,14)" :key="post.MiladiTarihKisa">
        <td> <img :src="post.AyinSekliURL" width="20" height="20" :alt="post.MiladiTarihUzun"> | {{ post.MiladiTarihUzun }}</td>
        <td>{{ post.Imsak }}</td>
        <td>{{ post.Gunes }}</td>
        <td>{{ post.Ogle }}</td>
        <td>{{ post.Ikindi }}</td>
        <td>{{ post.Aksam }}</td>
        <td>{{ post.Yatsi }}</td>


      </tr>
      <tr class="table-warning">
        <th scope="col">Tarih</th>
        <th scope="col">İmsak</th>
        <th scope="col">Güneş</th>
        <th scope="col">Öğle</th>
        <th scope="col">İkindi</th>
        <th scope="col">Akşam</th>
        <th scope="col">Yatsı</th>

      </tr>
      <tr v-for="post of posts.slice(14,21)" :key="post.MiladiTarihKisa">
        <td> <img :src="post.AyinSekliURL" width="20" height="20" :alt="post.MiladiTarihUzun"> | {{ post.MiladiTarihUzun }}</td>
        <td>{{ post.Imsak }}</td>
        <td>{{ post.Gunes }}</td>
        <td>{{ post.Ogle }}</td>
        <td>{{ post.Ikindi }}</td>
        <td>{{ post.Aksam }}</td>
        <td>{{ post.Yatsi }}</td>


      </tr>
      <tr class="table-warning">
        <th scope="col">Tarih</th>
        <th scope="col">İmsak</th>
        <th scope="col">Güneş</th>
        <th scope="col">Öğle</th>
        <th scope="col">İkindi</th>
        <th scope="col">Akşam</th>
        <th scope="col">Yatsı</th>

      </tr>
      <tr v-for="post of posts.slice(21,30)" :key="post.MiladiTarihKisa">
        <td> <img :src="post.AyinSekliURL" width="20" height="20" :alt="post.MiladiTarihUzun"> | {{ post.MiladiTarihUzun }}</td>
        <td>{{ post.Imsak }}</td>
        <td>{{ post.Gunes }}</td>
        <td>{{ post.Ogle }}</td>
        <td>{{ post.Ikindi }}</td>
        <td>{{ post.Aksam }}</td>
        <td>{{ post.Yatsi }}</td>


      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="7" class="text-center">{{ ilce }} / {{ sehir }} / {{ ulke }}</td>
      </tr>
      </tfoot>

    </table>
  <center>

    <router-link to="/" class="btn btn-outline-success mb-3">Anasayfa</router-link>
  </center>
  <div class="fixed-bottom" style="background-color: white;width: 100%"><center>Furkan Meclis &copy; 2021</center></div>
</div>
</div>

</template>

<script>
import axios from "axios";
export default {
  name: 'Weekly',
  created() {


    this.getPosts();
  },
  data() {
    return {
      posts: [],
      ilce:this.$cookies.get("Ilce") || "ADANA",
      sehir:this.$cookies.get("Sehir") || "ADANA",
      ulke:this.$cookies.get("Ulke") || "TÜRKİYE",
      errors: []
    };
  },
  methods: {

    getPosts() {
      let id = this.$cookies.get("IlceID") || 9146;
      axios.get("https://ezanvakti.herokuapp.com/vakitler/"+id).then(response => ( this.posts = response.data)).catch(error => {
        this.errors.push(error);
      });
    }
  }
}
</script>

