import React from 'react'

export const baseUrl = 'http://localhost:1313/'

export function ucwords(str: string) {
    if (str != null) {
        str = str.toString();
        str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
    }
    return str;
}

export async function get(requestUrl: string, params: { [key: string]: string; }, res: Function) {    
    const base = requestUrl.indexOf('http') !== -1 ? "" : baseUrl
    const esc = encodeURIComponent
    const queryParams = "?" + Object.keys(params).map((k: any) => esc(k) + '=' + esc(params[k])).join('&')
    await fetch(base + requestUrl + queryParams, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
    })
    .then(raw => raw.json())
    .then(response => res(response))    
}

export async function post(requestUrl: string, params: { [x: string]: string; }, res: Function) {
    const base = requestUrl.indexOf('http') !== -1 ? "" : baseUrl
    await fetch(base + requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then(raw => raw.json())
    .then(response => res(response))
}

export class MiniText extends React.Component<any, any> {

    _inputAsChange (e: any) {
        this.props.onChange(e.target.value)
    }

    render () {
        const { value } = this.props
        return (
            <input type="text" value={value} onChange={this._inputAsChange.bind(this)} spellCheck={false} />
        )
    }
}

export class MiniNumber extends React.Component<any, any> {

    _inputAsChange(e: any) {
        this.props.onChange(e.target.value.replace(/[^0-9]/gi, ''))
    }

    render() {
        const { value } = this.props
        return (
            <input type="text" value={value} onChange={this._inputAsChange.bind(this)} spellCheck={false} />
        )
    }
}

export class MiniTextarea extends React.Component<any, any> {

    _inputAsChange(e: any) {
        this.props.onChange(e.target.value)
    }

    render() {
        const { value } = this.props
        return (
            <textarea value={value} onChange={(e) => this._inputAsChange(e)} rows={3} spellCheck={false} />
        )
    }
}


export class MiniSelect extends React.Component<any, any> {

    state = {
        isShow: false,
        lbl: ''
    }

    constructor (props: any) {
        super(props)        
    }

    _showOption () {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    _set(val: string, lbl: any) {
        this.setState({ lbl })
        this.props.onChange(val);        
    }

    render () {
        const { isShow, lbl } = this.state
        const { data, id, label } = this.props

        return (
            <div className={`select ${isShow ? 'active' : ''}`} onClick={() => this._showOption()}>
                <div className="selectLabel"><div className="label">{lbl}</div> <i className="fas fa-caret-down float-right"></i></div>
                <div className="selectOption" style={{ display: (isShow ? 'block' : 'none') }}>
                    {data.map((obj: any) => (
                        <Option label={obj[label]} onClick={() => this._set(obj[id], obj[label])} />
                    ))}
                </div>
            </div>
        )
    }
}

const Option = (prop: any) => (    
    <div className="option" onClick={prop.onClick}>{prop.label}</div>        
)
