import { observable } from 'mobx'


class LoginStore {
    @observable input = {}     
}

const store = new LoginStore()

export default store