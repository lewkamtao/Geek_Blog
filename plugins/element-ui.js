import Vue from 'vue'
import '../assets/css/element-variables.scss'

import {
    Notification,
    MessageBox,
    Message,
    Backtop,
    Button,
    Dialog
} from 'element-ui'


Vue.component(Button.name, Button)
Vue.component(Backtop.name, Backtop)
Vue.component(Dialog.name, Dialog)


Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
