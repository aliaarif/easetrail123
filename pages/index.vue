<script setup>
const { city, slug, title } = useCommon();
const isLoading = ref(true)
onBeforeMount(() => { isLoading.value = true });
useHead({
  title: "Easetrail - List your Business Online and Connect with Customers Today!",
  meta: [
    {
      name: "Discover the Power of Visibility - Unlock your business's potential with free business listings on our platform. Increase your online presence and reach your target audience effortlessly. Join us today!",
      content:
        "Easetrail, is local search engine, provides Best Deals, Shop Online, Ticket Booking for Flights, Hotels, Movies, Buses and Cabs. You can also Order Food, Book Restaurant Table, View Menu, Book Doctors’ Appointments. Easetrail curates Social content, News, Videos and more from Top Publishers on all Trending Topics.",
    },
  ],
});




onMounted(() => {
  if (window !== "undefined") {
    category.value = !localStorage.category
      ? localStorage.setItem("category", "hire-on")
      : slug(localStorage.category);
    city.value = !localStorage.city
      ? localStorage.setItem("city", "gurugram")
      : title(localStorage.city);
  }
  isLoading.value = false
});

const category = ref("hire-on");
const { data: categories } = await useAsyncData("categories", () => {
  return $fetch(`/api/categories`, {
    method: "get",
  })
});

const { data: cityCount } = await useAsyncData("cityCount", () => {
  return $fetch(`/api/cities?name=${city.value}`, {
    method: "get",
  })
});

if (cityCount == 0) {
  city.value = ''
}

</script>
<template>


      <div>
        <CategorySkeleton :count="categories.length" width="100%" height="30px" v-if="isLoading"  />
        
        <section class="et-heading">
          <h1 class="title">Search for Business, Places and Services.</h1>
          <!-- <p class="description">Thoroughly tested and evaluated by our expert editors to help you make a more informed buying decision.</p> -->
        </section>
        
        <div class="columns is-multiline is-mobile">
          <div class="column is-3-tablet is-6-mobile" v-for="category in categories" :key="category._id">

            <nuxt-link :to="`/${slug(city)}/${slug(category.slug)}`" class="grid-item box">
              <img
                :src="category.image"
                style="width: 100px; height: 100px"
                alt="Your Image"
              />
              <p>
                <b>{{ category.name }}</b>
              </p>
            </nuxt-link>
        </div>
        
        
        </div>

        <section class="inside-container">
          <div class="container">
            <h2 class="title is-3 has-text-black heading-ct">Now Live at</h2>
            <div class="columns is-multiline is-mobile">
           
  <div class="column is-3-tablet is-6-mobile">
            <div class="box stack">
              Malappuram
            </div>
          </div>
          
          <div class="column is-3-tablet is-6-mobile">
            <div class="box stack">
              test
            </div>
          </div>

          <div class="column is-3-tablet is-6-mobile">
            <div class="box stack">
              hello
            </div>
          </div>

          <div class="column is-3-tablet is-6-mobile">
            <div class="box stack">
              Malappuram
            </div>
          </div>


   <div class="column is-3-tablet is-6-mobile">
            <div class="box stack">
              Malappuram
            </div>
          </div>

             <div class="column is-3-tablet is-6-mobile">
            <div class="box stack">
              Malappuram
            </div>
          </div>

            </div>
          </div>
        </section>
      </div>

  
  <!-- <section>
  <ParentC />
    <CategorySkeleton :count="categories.length" width="100%" height="30px" v-if="isLoading"  />
    <template v-else>
    <h3 class="title mt-6 mb-6">Search for Business, Places and Services.</h3>
    <div class="columns is-multiline is-mobile is-variable is-2-tablet">
      <div
        class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen"
        v-for="category in categories"
        :key="category._id"
      >
        <nuxt-link :to="`/${slug(city)}/${slug(category.slug)}`" class="grid-item box">
          <img
            :src="category.image"
            style="width: 100px; height: 100px"
            alt="Your Image"
          />
          <p>
            <b>{{ category.name }}</b>
          </p>
        </nuxt-link>
      </div>
    </div>
  </template>
  </section> 

<section class="hero is-peach">
    <div class="hero-body">
      <div class="container">
 <h1 class="title is-3 has-text-black heading-ct">
          Now Live at
        </h1>

        <div class="columns is-multiline is-mobile">
          <div class="column is-3-tablet is-6-mobile">
            <div class="box is-orange has-text-orange">
              Malappuram
            </div>
          </div>
          
          <div class="column is-3-tablet is-6-mobile">
            <div class="box is-orange has-text-orange">
              test
            </div>
          </div>

          <div class="column is-3-tablet is-6-mobile">
            <div class="box is-orange has-text-orange">
              hello
            </div>
          </div>

          <div class="column is-3-tablet is-6-mobile">
            <div class="box is-orange has-text-orange">
              Malappuram
            </div>
          </div>


   <div class="column is-3-tablet is-6-mobile">
            <div class="box is-orange has-text-orange">
              Malappuram
            </div>
          </div>

             <div class="column is-3-tablet is-6-mobile">
            <div class="box is-orange has-text-orange">
              Malappuram
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->


</template>
<style scoped>
.title {
  color: #363636;
  margin-top: 30px;
  margin-bottom: 0px;
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 26px;
  }
}
.column.is-6-mobile.is-4-tablet.is-4-desktop.is-3-widescreen {
  padding: 10px;
}
.container.mt-2 section {
  margin-left: 20px;
  margin-right: 20px;
}

.heading-ct {
      margin-bottom: 25px;
      margin-top: -10px;
    }

    .is-peach {
      background-color: rgba(250,105,0,.1);
      margin-top: 40px;
      border-radius: 10px;
    }

    .is-orange {
      border: 2px solid #fa6900;
      background-color: transparent;
      border-radius: 50px;
      color: #fa6900;
      text-align: center;
    }

    .box.is-orange:hover {
      background-color: orange;
    }

    .is-orange:hover {
    color: white;
}
</style>
