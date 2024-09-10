import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // import Material Design Icons, use mdi-xxx
import 'vuetify/styles'
import {
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VBtn,
  VIcon
} from 'vuetify/components'

const vuetify = createVuetify({
  components: {
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VBtn,
    VIcon,
  },
})

export default vuetify
