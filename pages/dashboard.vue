<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
const authStore = useAuthStore();
const authDataStore = useAuthDataStore();

const {
  dynamicTitle,
  title,
  setItem,
  auth,
  setAuth,
  module,
  setDynamicTitle,
  setModule,
  setAction,
  setEdit,
} = useCommon();
definePageMeta({
      layout: 'dashboard'
  })
  
  useHead({
    title: `Obelcon | Dashboard`,
    meta: [{ name: "description", content: "Obelcon Dashboard Page" }],
  });
  
onMounted(() => {
    if (!authStore.isAuthenticated) {
      navigateTo("/login");
    } else {
      authDataStore.setAuthData(authDataStore.authData ?? {});
    }
    });
    
    const adminModules = ref([
    "businesses",
    "categories",
    "subcategories",
    "cities",
    "states",
    "scripts",
    ]);
    const qcModules = ref(["QC Done", "Approoved", "Pending", "Rejected"]);
    const staffModules = ref(["Total Posted", "Approoved", "Pending", "Rejected"]);
    
    const setModuleAndAction = (mod, act, edit) => {
      setModule(mod);
      setAction(act);
      setEdit(edit);
};


  </script>
  
  <template>
    <section>
      <div class="columns mt-1">
        <div class="column is-one-fifth">
          <AdminAside v-if="authDataStore.authData.role === 'Admin'" />
          <StaffQcAside
          v-if="authDataStore.authData.role === 'Staff' || authDataStore.authData.role === 'QC' || authDataStore.authData.role === 'User'"
          />
        </div>
        <div class="column is-four-fifths">
          <div class="block">
            <div
            class="tag is-primary is-medium ml-1 is-pulled-left"
            v-if="module != 'dashboard'"
            >
            {{ dynamicTitle }}
          </div>
          
          <div
          class="button tag is-primary is-medium ml-1 is-pulled-right"
          v-if="
          module != 'dashboard' &&
          module != 'contacts' &&
          module != 'leads' &&
          module != 'users' &&
          module != 'profile'
          "
          @click="
          setModuleAndAction(module, 'add-edit', true),
          setDynamicTitle('Add ' + title(module)),
          setItem('')
          "
          >
          Add New
        </div>
      </div>
      <br />
      <Default />
    </div>
  </div>
</section>
</template>

<style scoped></style>
