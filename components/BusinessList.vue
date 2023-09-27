
<script setup>
import { useAuthDataStore } from "@/stores/auth-data";
const authDataStore = useAuthDataStore();

const message = ref('')

const showMessage = ref(false)

const callShowMessage = (res) => {
  console.log(res)
  message.value = res
  showMessage.value = true
  setTimeout(() => {
      showMessage.value = false
  }, 2000);
}


const props = defineProps({
    propsObj: {
        type: Object
    }
})
const leadsFormData = ref({
  subcategory: props.propsObj.data.split("-in-")[0],
  city: props.propsObj.city,
  name: authDataStore.authData.name ?? "",
  phone: "",
  email: authDataStore.authData.email ?? "",
  query: props.propsObj.data,
  status: "Pending",
});
const leadErrors = ref({
  name: false,
  phone: false
})
const generateLead = () => {
  leadErrors.value.name = !leadsFormData.value.name ? true : false
  leadErrors.value.phone = (!leadsFormData.value.phone) || (!/^\d{10}$/.test(leadsFormData.value.phone)) ? true : false
  
    useFetch("/api/save/lead", {
        method: 'post',
        body: leadsFormData,
        watch:false
    }).then((res) => {
      console.log(res)
      // message.value = callShowMessage(res)
    })
}
</script>

<template>
<section>
      <Loader />
      <span class="is-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><nuxt-link :to="'javascript:;'"><i class="fa fa-home" aria-hidden="true"></i></nuxt-link></li>
            <li><nuxt-link to="/">{{ props.propsObj.title(props.propsObj.city) }} </nuxt-link></li>
            <li><nuxt-link :to="props.propsObj.data">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</nuxt-link></li>
            <li class="is-active"> <a href="javascript:;" aria-current="page">{{ props.propsObj.contents.length }}</a></li>
          </ul>
        </nav>
        <h1 class="title is-1">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(city) }}</h1>
        <p class="mt-4">
          {{ props.propsObj.meta.page_content.replace(new RegExp("cityName", "g"), props.propsObj.title(city)) }}
        </p>
      </span>
      <div class="blog-section mt-6 mb-6">
        <div class="blog-content">
          <div v-for="(b, index) in props.propsObj.contents" :key="index">
            <nuxt-link  :to="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-biz-${b?._id.substr(16)}`" class="media mt-4">
              <div class="media-left">
                <figure class="image custom-image">
                  <img :src="`${b?.business_images[0] ?? '../Image_not_available.png'}`" alt="Business Image" />
                </figure>
              </div>
              <div class="media-content">
                <h1 class="title is-4">{{ b.business_name }}</h1>
                <div>
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <span>{{ b.business_address }}</span
                  >, <span>{{ b.business_locality }}</span
                  >, <span>{{ b.business_city }}</span
                  >, <span>{{ b.business_state }}</span
                  >,
                  <span>{{ b.business_pin }}</span>
                </div>
                <div><i class="fa fa-phone" aria-hidden="true"></i> {{ b.business_phone }}</div>
                <div v-if="b.business_services.length > 0" class="mt-2">
                  <div class="buttons">
                    <button class="button is-primary is-ligh is-small"
                      v-for="service in b.business_services" :key="service">
                      {{ service }}
                    </button>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <aside class="sidebar">
          <div class="form-box">
            <form @submit.prevent="generateLead">
              <h1 class="title is-3 is-size-5">Query Form</h1>
              <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
              <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.name}" 
                v-model="leadsFormData.name"  
                placeholder="Your Name"/>
                
                <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.phone}" 
                v-model="leadsFormData.phone"  
                placeholder="Your Phone Number"/>

                <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.email}" 
                v-model="leadsFormData.email"  
                placeholder="Your Email"/>
                <button type="submit" class="button is-primary is-small mt-4">Get Best Deal</button> 
            </form>
          </div>
        </aside>
      </div>
    </section>
</template>

<style scoped>
.media:hover {
  background-color: #e0e0e0;
}
</style>