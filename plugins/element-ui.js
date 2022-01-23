import Vue from "vue";
import "../assets/css/element-variables.scss";

import { Notification, MessageBox, Message, Backtop, Button, Select,Option } from "element-ui";

Vue.component(Button.name, Button);
Vue.component(Backtop.name, Backtop);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);

Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
