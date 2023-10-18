<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
const isLoading = ref(true)
onBeforeMount(() => { isLoading.value = true });

definePageMeta({
  middleware: "query",
});

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();

const { title, slug, pageTitle, pageType, meta, day } = useCommon();
const router = useRouter();
const city = router.currentRoute.value.params.city;
const data = router.currentRoute.value.params.query;
const pageNo = ref(1);
const contents = ref("");
const metaContent = ref("");
const images = ref([]);

if (pageType.value == "Subcategories") {
  const { data: res } = await useAsyncData("res", () => {
    return $fetch(`/api/query?slug=${data}`, {
      method: "get",
    });
  });
  contents.value = res.value;
  pageTitle.value = `${meta.value.page_title} in ${title(city)}`;
  metaContent.value = `${meta.value.page_content}`;
} else if (pageType.value == "Businesses") {
  const { data: res } = await useAsyncData("res", () => {
    return $fetch(
      `/api/query?city=${title(city)}&subcategory=${data.split("-in-")[0]}`,
      {
        method: "get",
      }
    );
  });
  contents.value = res.value;
  pageTitle.value = `${meta.value.page_title} in ${title(city)}`;
  metaContent.value = `${meta.value.page_content}`;
} else if (pageType.value == "Business Details") {
  const { data: res } = await useAsyncData("res", () => {
    return $fetch(`/api/query?business_slug=${data.split("-biz-")[0]}`, {
      method: "get",
    });
  });
  contents.value = res.value;
  images.value = contents.value.business_images;
  metaContent.value = `${meta.value.page_content}`;
  pageTitle.value = `${meta.value.page_title} in ${title(city)}`;
} else if (pageType.value == "CMS") {
  metaContent.value = `Dummy Contents`;
  pageTitle.value = `Dummy Title`;
}


const componentName = ref(null)
const propsObj = ref({
    title:title,
    slug:slug,
    city:city,
    data: data,
    meta: meta.value,
    pageTitle:pageTitle.value,
    pageType:pageType.value,
    day: day.value,
    contents: contents.value,
    images: images.value,
    business_images: contents.value.business_images,
    authStore: authStore,
    authDataStore: authDataStore
})

if (city == 'mobile') {
  componentName.value = 'MobileMenu'
}

if (pageType.value == 'Subcategories' && data != 'profile') {
  componentName.value = 'Subcategories'
}

if (pageType.value == 'Businesses'  && data != 'profile') {
  componentName.value = 'BusinessList'
}

if (pageType.value == 'Business Details' && data != 'profile') {
  pageTitle.value = contents.value.business_name
  componentName.value = 'BusinessDetails'
}

useHead({
  title: `${pageTitle.value}`,
  meta: [{ name: "description", content: metaContent.value }],
});

onMounted(() => {
  isLoading.value = false
});

</script>

<template>
  <template v-if="city == 'mobile'">
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <ul v-if="data == 'menu'">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/about">About</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
            <li><nuxt-link to="/login">Login</nuxt-link></li>
            <li><nuxt-link to="/register">Register</nuxt-link></li>
          </ul>
          <Search v-else />
        </li>
      </ul>
    </aside>
  </template>

  <template v-else-if="pageType == 'Subcategories' && data != 'profile'">
    <SubcategorySkeleton :count="propsObj.contents.length" width="100%" height="40px" v-if="isLoading"  />
    <Subcategories :propsObj="propsObj" v-else/>
  </template>

  <template v-else-if="pageType == 'Businesses'  && data != 'profile'">
    <BusinessListSkeleton :count="propsObj.contents.length" width="100%" height="200px" v-if="isLoading"  />
    <BusinessList :propsObj="propsObj" v-else/>
  </template>

  <template v-else-if="pageType == 'Business Details' && data != 'profile'">
    <BusinessDetailsSkeleton :count="propsObj.contents.length" width="100%" v-if="isLoading"  />
    <BusinessDetails :propsObj="propsObj" v-else/>
  </template>
</template>

<style>
h1.title.is-1 {
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: 0px;
}

nav.breadcrumb {
  margin-top: 30px;
  margin-bottom: 0px;
}

.form-box {
  width: 300px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid#d6d6d6;
  border-radius: 10px;
}

.form-field {
  display: block;
  width: 100%;
  margin: 20px auto;
  padding: 11px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}

.form-button {
  display: block;
  width: 100%;
  margin: 10px auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0479d3;
  color: white;
  font-weight: bold;
}

.recent-post ul {
  width: 300px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
}

.sidebar {
  flex-basis: 20%;
  background-color: #fff;
}

.blog-content {
  flex-basis: 80%;
}

.sidebar {
  padding: 0px;
}

.columns.mt-4 {
  margin: 0px 0px 17px;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
}

.inner {
  margin-top: 17px;
}

.container.mt-2 section {
  margin-left: 20px;
  margin-right: 20px;
}

@media screen and (max-width: 768px) {
  h1.title.is-1 {
    font-size: 26px;
  }

  .blog-content {
    flex-basis: 100%;
  }

  .title.is-4 {
    margin-top: 14px;
  }

  .media-left {
    margin-right: 0px;
  }

  .sidebar {
    flex-basis: 100%;
  }

  .form-box,
  .recent-post ul {
    width: 100%;
  }
}

aside {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
}


.dirty{
    border: 1px solid red;
}

.good{
    border: 1px solid #00b89c;
}

.icon-dirty{
    color: red;
}

.icon-good{
    color: #00b89c;
}

.text-dirty{
    color: red;
}

.text-good{
    color: #00b89c;
}
</style>
