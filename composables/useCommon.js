

import { useAuthDataStore } from "@/stores/auth-data";
export default function useCommon() {


    const authDataStore = useAuthDataStore();
    const city = useState('city', () => 'new-delhi')
    const category = useState('category', () => 'hire-on')
    const pageTitle = useState('pageTitle', () => '')
    const metaContent = useState('metaContent', () => '')
    const meta = useState('meta', () => { })
    const customMeta = useState('customMeta', () => { })
    const pageType = useState('pageType', () => '')
    const dynamicTitle = useState('dynamicTitle', () => 'Dashboard')
    const fields = useState('fields', () => [])
    const module = useState('module', () => 'dashboard')
    const td = useState('td', () => [])
    const scats = useState('scats', () => [])
    const sCat = useState('sCat', () => '')
    const item = useState('item', () => { })
    const action = useState('action', () => 'grid')
    const edit = useState('edit', () => false)
    const pageNo = useState('pageNo', () => 1)
    const pageLimit = useState('pageLimit', () => 50)
    const auth = useState('auth', () => authDataStore.authData)
    const pageSlug = useState('pageSlug', () => '')
    const searchTerms = useState('searchTerms', () => '')
    const profileTab = useState('profileTab', () => 'profile')
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = useState('day', () => {
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        const currentDayName = daysOfWeek[currentDayIndex];
        return currentDayName
    })


    const encryptObject = (obj, key) => {
        // Convert the object to a JSON string
        const jsonString = JSON.stringify(obj);

        // Encrypt using AES with the provided key
        const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();

        return encrypted;
    }

    const decryptObject = (encryptedData, key) => {
        // Decrypt the encrypted data using AES and the provided key
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        // Parse the JSON string back into an object
        const decryptedObj = JSON.parse(decryptedString);

        return decryptedObj;
    }

    const slug = (str) => {
        return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
    }

    const title = (str) => {
        var words = str ? str.split('-') : '';
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return words ? words.join(' ') : '';
    }

    const { data: pages } = useAsyncData('pages',
        () => {
            return $fetch(`/api/pages`, {
                method: 'get'
            })
        },
    )

    const { data: page } = useAsyncData('page', () => {
        return $fetch(`/api/pages?slug=${pageSlug.value}`, {
            method: 'get'
        })
    },
    )

    const { data: subcategories } = useAsyncData('subcategories', () => {
        return $fetch(`/api/subcategories`, {
            method: 'get'
        })
    }
    )

    const { data: categories } = useAsyncData('categories', () => {
        return $fetch(`/api/categories`, {
            method: 'get'
        })
    },
    )

    const showDateTime = (val) => {
        const timestamp = val
        const date = new Date(timestamp)
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const formattedDate = date.toLocaleDateString('en-IN', options)
        return formattedDate
    }

    const setProfileTab = (val) => {
        profileTab.value = val
        return;
    }

    const setAuth = (val) => {
        auth.value = val
        return;
    }

    const setPage = (val) => {
        pageSlug.value = val
        useFetch(`/api/pages?slug=${val}`, {
            method: 'get'
        }).then((res) => {
            page.value = res
        })
    }

    const setItem = (val) => {
        item.value = val
    }

    const setCity = (val) => {
        city.value = val
    }

    const setPageTitle = (val) => {
        pageTitle.value = val
        return;
    }

    const setMetaContent = (val) => {
        metaContent.value = val
        return;
    }

    const setPageType = (val) => {
        pageType.value = val
        return;
    }

    const setDynamicTitle = (val) => {
        dynamicTitle.value = val
        return;
    }

    const setMeta = (val) => {
        meta.value = val
        return;
    }

    const setCustomMeta = (val) => {
        customMeta.value = val
        return;
    }

    const setModule = (val) => {
        module.value = val

        if (val == 'states') {
            td.value = ['Name', 'Cities', 'Status', 'Action']
            fields.value = [
                {
                    label: 'Name',
                    type: 'text',
                    name: 'name',
                    value: '',
                    default: ''
                }
            ]
        }

        if (val == 'cities') {
            td.value = ['Name', 'Localities', 'Status', 'Action']
            fields.value = [
                {
                    label: 'Name',
                    type: 'text',
                    name: 'name',
                    value: '',
                    default: ''
                }

            ]
        }

        if (val == 'subcategories') {
            td.value = ['Category', 'Subcategory', 'Businesses', 'Status', 'Action']
            fields.value = [
                {
                    label: 'Category Name',
                    type: 'dropdown',
                    name: 'category',
                    value: categories,
                    default: '---Select---'
                },

                {
                    label: 'Sub Category Name',
                    type: 'text',
                    name: 'subcategory',
                    value: '',
                    default: ''
                },

                {
                    label: 'Sub Category 111 ',
                    type: 'text',
                    name: 'subcategory',
                    value: '',
                    default: ''
                },


                {
                    label: 'Page Title',
                    type: 'text',
                    value: '',
                    default: ''
                },
                {
                    label: 'Page Content',
                    type: 'text',
                    value: '',
                    default: ''
                }


            ]
        }



        if (val == 'scripts') {
            td.value = ['Name', 'Type', 'Positions', 'Body', 'Status', 'Action']
        }

        if (val == 'contacts') {
            td.value = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Status', 'Action']
        }

        if (val == 'leads') {
            td.value = ['City', 'Category', 'Query', 'Name', 'Email', 'Phone', 'Date', 'Status', 'Action']
        }

        if (val == 'users') {
            td.value = ['Name', 'Email', 'Role', 'City', 'Status', 'Action']
        }

        if (val == 'businesses') {
            if (auth.value.role === 'Admin') {
                td.value = ['id', 'Name', 'Category', 'City', 'Content By', 'Approved By', 'Date', 'Status', 'Action']
            }
            if (auth.value.role === 'QC') {
                td.value = ['id', 'Name', 'Category', 'City', 'Content By', 'Approved By', 'Date', 'Status', 'Action']
            }
            if (auth.value.role === 'Staff') {
                td.value = ['id', 'Name', 'Category', 'City', 'Content By', 'Approved By', 'Date', 'Status', 'Action']
            }

            fields.value = [
                {
                    label: 'Business Name',
                    type: 'text',
                    name: 'business_name',
                    value: '',
                    default: item.value
                },
                {
                    label: 'Business Slug',
                    type: 'text',
                    name: 'business_name',
                    value: '',
                    default: ''
                },
                {
                    label: 'Business Ownership',
                    type: 'dropdown',
                    name: 'business_ownership',
                    value: '',
                    default: 'Unclaimed'
                },
                {
                    label: 'Business Category',
                    type: 'dropdown',
                    name: 'business_category',
                    value: subcategories,
                    default: ''
                },

            ]
        }
        $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}`, {
            method: 'get'
        }).then((res) => {
            // console.log(res)
            rows.value = res
        })
        return;
    }



    const setPageNo = (val) => {
        pageNo.value = val
        return;
    }

    const setPageLimit = (val) => {
        pageLimit.value = val
        return;
    }

    const setAction = (val) => {
        action.value = val
        return;
    }

    const setTd = (val) => {
        td.value = val
        return;
    }

    const setEdit = (val) => {
        edit.value = val
        return;
    }

    const rows = useState('rows', () => {
        return {}
    })

    const setSCat = (val) => {
        sCat.value = val
        return;
    }

    return {
        encryptObject,
        decryptObject,
        profileTab,
        setProfileTab,
        showDateTime,
        searchTerms,
        pages,
        page,
        setPage,
        pageNo,
        setPageNo,
        pageLimit,
        setPageLimit,
        auth,
        setAuth,
        city,
        setCity,
        slug,
        title,
        setSCat,
        day,
        pageTitle,
        setPageTitle,
        metaContent,
        setMetaContent,
        meta,
        setMeta,
        customMeta,
        setCustomMeta,
        pageType,
        setPageType,
        module,
        action,
        edit,
        setModule,
        setAction,
        setEdit,
        td,
        setTd,
        rows,
        dynamicTitle,
        setDynamicTitle,
        fields,
        item,
        setItem,
        categories,
        subcategories
    }
}