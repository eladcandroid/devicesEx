import React, {Component} from 'react';
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.refreshDevices = this.refreshDevices.bind(this);
        this._handleSelect = this._handleSelect.bind(this);
        this.state = {
            devices: {},
            fetchFlag: true,
            currentId: '',
            currentProfile: {}
        };
    }

    refreshDevices(devices) {
        this.setState({devices: devices.value, fetchFlag: false});
    }

    fetchData() {
        fetch('http://stg.api.axonize.com/odata/devices', {
            method: 'get',
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVtc3lzQGF4b25pemUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRlbmFudElkIjoiNTc0NTZjMGUxODZhMjgxOGU0ZjE4MWRlIiwiYXBwSWQiOiJiNzk5YWFlOS01MWI4LTQ2MTMtOGExZC04OTRhODBiMzU0ODEiLCJyb2xlcyI6WyJBZG1pbiJdLCJ1c2VySWQiOiI1NzQ1NmMxMDE4NmEyODE4ZTRmMTgxZTAiLCJpc3MiOiJodHRwczovL3NvaW90LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NzQ1NmMxMTk3YWY2ZmZiMzAxYjRiYjkiLCJhdWQiOiIxQ0Z4UUJpYmpuTEFlWTdPTFVXam1aV041NlFLYzBIOSIsImV4cCI6MTQ3MDkzNjcxMiwiaWF0IjoxNDcwOTAwNzEyfQ.aFqxtxmxyupoXJDQ0ngA91Ht0SK-ZqfOe18YMymUdtQ',
                'appId': 'b799aae9-51b8-4613-8a1d-894a80b35481'

            }
        })
            .then(function (response) {
                return response.json()
            }).then((json)=> {
                console.log('parsed json', json);
                this.refreshDevices(json);
        }).catch((ex)=> {
            console.log('parsing failed', ex)
        })
    }

    componentDidMount() {
        this.fetchData();
    }
    onSearchChange(searchText){

    }

    _getDevicesTable() {
        if (!this.state.fetchFlag) {
            return <BootstrapTable data={this.state.devices} options={ { onSearchChange: this.onSearchChange } } striped={true} hover={true} condensed={true} remote={false} search={true}>
                <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="productId">Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField="productName">Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField="serialNumber">Serial Number</TableHeaderColumn>
            </BootstrapTable>;
        }
    }

    _handleSelect(key) {
        this.setState({currentId: key});
        this.fetchDataById(key);
    }

    render() {
        return (
            <div>
                {this._getDevicesTable()}
            </div>
        );
    }
}
