import React from 'react'
import { Redirect } from 'react-router-dom'
import { observable, action } from 'mobx'


class GlobalStore {
    @observable currentPath = '/'
    @observable params = {}
    @observable auth = {}    

    @action redirect = (path: string, state: boolean) => {
        if (state && path !== this.currentPath) {
            return <Redirect to={path} />
        }
        return false
    }
}

const store = new GlobalStore()

export default store